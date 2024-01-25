import { Suspense } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Hero from "@/app/(auth)/artists/[id]/Hero/Hero"
import Albums from "@/app/(auth)/artists/[id]/Albums/Albums"
import RelatedArtist from "@/app/(auth)/artists/[id]/RelatedArtists/Relateds"
import Tracks from "./Tracks/Tracks"
// loaders
import ArtistHeroLoader from "@/components/Loader/ArtistHeroLoader.js"
import TracksLoader from "./Tracks/TracksLoader"
import RelatedLoader from "@/app/(auth)/artists/[id]/RelatedArtists/RelatedLoader"
import AlbumsLoader from "@/app/(auth)/artists/[id]/Albums/AlbumsLoader"
// styles
import { ArtistWrapper } from "@/app/(auth)/artists/[id]/Page.module.scss"


export default function ArtistPage ({ params }) {
  return (
    <Container fluid className={`artist-page ${ArtistWrapper}`}>
      <Row>
        <Col lg={6}>
          <Suspense fallback={<ArtistHeroLoader />}>
            <Hero artistId={params.id} />
          </Suspense>
        </Col>
        <Col lg={6} className='mt-5 mt-lg-0'>
          <Suspense fallback={<TracksLoader />}>
            <Tracks artistId={params.id} />
          </Suspense>
        </Col>
        <Col md={12} className={`page-section`}>
          <Suspense fallback={<AlbumsLoader />}>
            <Albums artistId={params.id} />
          </Suspense>
        </Col>
        <Col md={12} className={`page-section`}>
          <Suspense fallback={<RelatedLoader title="RELATED ARTIST" />}>
            <RelatedArtist artistId={params.id} />
          </Suspense>
        </Col>
      </Row>
    </Container>
  )
}