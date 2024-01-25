import { cookies } from 'next/headers'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Track from '@/components/Tracks/Track'
import style from "./Tracks.module.scss"

async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/top/tracks`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { items = [] } = res
        return items
      })
  } else {
    return []
  }
}

export default async function MyTopArtist ({ className = "" }) {
  const tracks = await load()

  return (
    <div className={`${style.TopTracksList} ${className}`}>
      <span className={`section-title`}>My top Tracks</span>
      <div className={`${style.TopTracksListWrapp} mt-4 mt-lg-5`}>
        <Row>
          {
            tracks.map((track, index) => (
              <Col lg={3} key={index}>
                <Track track={track} showImage={true} className={style.TopTracksListWrappTrack} />
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}