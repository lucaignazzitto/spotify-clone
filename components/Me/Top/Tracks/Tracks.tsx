import Track from '@/components/Tracks/Track'
import { TrackInterface } from '@/lib/models/track.interface'
import { cookies } from 'next/headers'
import style from "./Tracks.module.scss"
import { Col, Row } from 'react-bootstrap'

async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/top/tracks`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 3600,
      tags: ['top-tracks']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        const { items = [] } = res
        return items as TrackInterface[]
      })
  } else {
    return []
  }
}

export default async function MyTopArtist({ className = "" }: { className?: string }) {
  const tracks = await load()

  return (
    <div className={`${style.TopTracksList} ${className}`}>
      <span className={`section-title`}>My top Tracks</span>
      <div className={`${style.TopTracksListWrapp} mt-3 mt-lg-4`}>
        <Row>
          {
            tracks.map((track, index) => (
              <Col md={6} xl={3} key={index}>
                <Track track={track} parentUri={track.album.uri} showImage={true} className={style.TopTracksListWrappTrack} />
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}