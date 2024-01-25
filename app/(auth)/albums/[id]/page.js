import { cookies } from 'next/headers'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import pageBg from "@/public/images/bubble-3.jpg"
import Tracks from "@/components/Tracks/Tracks"
import GernericAlbumHero from "@/components/Hero/Album/GenericHero"
import CopyRight from "@/components/CopyRight/CopyRight"
import style from "./Page.module.scss"

async function loadAlbum(id) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/albums/${id}?market=IT`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    return response.json()
  } else {
    return []
  }
}

export default async function Album ({ params }) {
  const album = await loadAlbum(params.id)
  return (
    <Container fluid className={style.AlbumPage}>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <Row>
        <Col md={12}>
          <GernericAlbumHero album={album} type={album.type} />
        </Col>
        <Col md={12}>
          <Tracks tracks={album?.tracks?.items} className={style.AlbumPageTracks} showNumber={true} showOptions={true} />
          <CopyRight copyrights={album?.copyrights} />
        </Col>
      </Row>
    </Container>
  )
}
