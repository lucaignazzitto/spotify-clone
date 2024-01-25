import Row from 'react-bootstrap/Row';
import ArtistHeroLoader from '@/components/Loader/ArtistHeroLoader';
import ArtistLoader from '@/components/Loader/ArtistLoader';

export default function Loading () {
  return (
    <Row>
      <ArtistHeroLoader />
      <ArtistLoader times={4} sm={4} xs={6} title={"Playlist pubbliche"} className="mt-5" />
      <ArtistLoader times={4} sm={4} xs={6} title={"Your Playlist"} className="mt-2" />
    </Row>
  )
}