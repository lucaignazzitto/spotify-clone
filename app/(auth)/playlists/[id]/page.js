import { cookies } from 'next/headers'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import pageBg from "@/public/images/bubble-3.jpg"
import GernericAlbumHero from "@/components/Hero/Album/GenericHero"
import Tracks from "@/components/Tracks/Tracks"
import CopyRight from "@/components/CopyRight/CopyRight"
import style from "./Page.module.scss"

async function loadPlaylist(id) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/playlists/${id}?market=IT`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        return res
      })
  } else {
    return []
  }
}

export default async function Playlist ({ params }) {
  const playlist = await loadPlaylist(params.id)

  return (
    <Container fluid className={style.AlbumPage}>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <Row>
        <Col md={12}>
          <GernericAlbumHero album={playlist} type={playlist.type} />
        </Col>
        <Col md={12}>
          <Tracks
            tracks={playlist?.tracks?.items}
            from="playlist"
            playlistId={playlist.id}
            showImage={true}
            showOptions={true}
            className={style.AlbumPageTracks}
          />
          <CopyRight copyrights={playlist?.copyrights} />
        </Col>
      </Row>
    </Container>
  )
}
