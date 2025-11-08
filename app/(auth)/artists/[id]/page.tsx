import { cache, Suspense } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Hero from "@/app/(auth)/artists/[id]/Hero/Hero"
import Albums from "@/app/(auth)/artists/[id]/Albums/Albums"
import Tracks from "./Tracks/Tracks"
// loaders
import ArtistHeroLoader from "@/components/Loader/ArtistHeroLoader"
import TracksLoader from "./Tracks/TracksLoader"
import AlbumsLoader from "@/app/(auth)/artists/[id]/Albums/AlbumsLoader"
// styles
import style from "./Page.module.scss"
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { cookies } from 'next/headers'
import { Metadata } from 'next'

const loadArtist = cache(async (artistId: string) => {
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

export async function generateMetadata({ params }: { params: Promise<{ id: ArtistInterface['id'] }>}): Promise<Metadata> {
  const { id } = await params
  const artist = await loadArtist(id) as ArtistInterface
  
  return {
    title: artist.name,
    keywords: artist.genres
  }
}

export default async function ArtistPage ({ params }: { params: Promise<{ id: ArtistInterface['id'] }>}) {
  const { id } = await params
  const artist = await loadArtist(id) as ArtistInterface

  return (
    <Container fluid className={`artist-page ${style.ArtistWrapper}`}>
      <Row>
        <Col lg={6}>
          <Suspense fallback={<ArtistHeroLoader />}>
            <Hero artist={artist} />
          </Suspense>
        </Col>
        <Col lg={6} className='mt-5 mt-lg-0'>
          <Suspense fallback={<TracksLoader />}>
            <Tracks artistId={artist.id} />
          </Suspense>
        </Col>
        <Col md={12} className={`page-section`}>
          <Suspense fallback={<AlbumsLoader />}>
            <Albums artistId={artist.id} />
          </Suspense>
        </Col>
      </Row>
    </Container>
  )
}