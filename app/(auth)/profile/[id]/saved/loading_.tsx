import Row from 'react-bootstrap/Row';
import ArtistHeroLoader from '@/components/Loader/ArtistHeroLoader';
import TracksLoader from '@/components/Loader/TracksLoader';

export default function Loading () {
  return (
    <Row>
      <ArtistHeroLoader />
      <TracksLoader times={20} direction="vertical" className="mt-5" />
    </Row>
  )
}