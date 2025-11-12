import { cache, Suspense } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Albums from "@/app/(auth)/artists/[id]/Albums/Albums"
// loaders
import ArtistHeroLoader from "@/components/Loader/ArtistHeroLoader"
import GenericAlbumsLoader from '@/components/Loader/GenericAlbumsLoader'
// styles
import style from "./Page.module.scss"
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import { IncludesGroup } from '@/lib/models/album.inteface'
import TracksLoader from '@/components/Loader/TracksLoader'
import Tracks from './Tracks/Tracks'
import Hero from '@/components/Artists/Hero/Hero'

const market = 'IT'

export const loadArtist = cache(async (artistId: string) => {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}`, {
    headers: { Cookie: (await cookies()).toString() as string },
    next: {
      revalidate: 60,
      tags: ['artist']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        const { artist = {} } = res
        return artist
      })
  } else {
    return {}
  }
})

export async function generateMetadata({ params }: { params: Promise<{ id: ArtistInterface['id'] }> }): Promise<Metadata> {
  const { id } = await params
  const artist = await loadArtist(id) as ArtistInterface

  return {
    title: artist.name,
    keywords: artist.genres
  }
}

export default async function ArtistPage({ params, searchParams }: { params: Promise<{ id: ArtistInterface['id'] }>, searchParams: Promise<{ group?: IncludesGroup }> }) {
  const { id } = await params
  const { group = "album" } = await searchParams
  const artist = await loadArtist(id) as ArtistInterface

  return (
    <Container fluid className={`artist-page position-relative h-100`}>
      <Row>
        <Col lg={6}>
          <Suspense fallback={<ArtistHeroLoader />}>
            <Hero artist={artist} />
          </Suspense>
        </Col>
        <Col lg={6} className='mt-5 mt-lg-0'>
          <Suspense fallback={<TracksLoader times={5} direction="vertical" title="Popular songs" />}>
            <Tracks artistId={artist.id} />
          </Suspense>
        </Col>
        <Col md={12} className={`page-section`}>
          <Suspense fallback={<GenericAlbumsLoader title="Albumns" md={3} sm={4} xs={6} />}>
            <Albums artistId={artist.id} group={group} />
          </Suspense>
        </Col>
      </Row>
    </Container>
  )
}