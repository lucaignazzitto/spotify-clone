"use client"
import Track from '@/components/Tracks/Track'
import { TrackInterface } from '@/lib/models/track.interface'
import style from "./Tracks.module.scss"
import { motion } from 'framer-motion'
import { Col, Row, Stack } from 'react-bootstrap'
import UrlPicker from '@/components/Picker/UrlPicker'
import { useSearchParams } from 'next/navigation'

export const TOP_TERMS = [
  {
    urlKey: 'long_term',
    title: '1 year'
  },
  {
    urlKey: 'medium_term',
    title: '6 months'
  },
  {
    urlKey: 'short_term',
    title: '4 months'
  },
]

export default function MyTopTracks({
  tracks,
  className = "",
  urlKey = "tracks_time_range"
}: { tracks?: TrackInterface[], className?: string, urlKey?: string }) {

  const searchParams = useSearchParams()
  const activeTerm = searchParams.get(urlKey) || "medium_term"

  return (
    <div className={`${style.TopTracksList} ${className}`}>
      <Stack direction="vertical" className="flex-md-row align-md-items-center justify-content-md-between" gap={3}>
        <span className={`section-title`}>My top Tracks</span>
        <div className='d-flex align-items-center gap-3'>
          <UrlPicker options={TOP_TERMS} urlKey={urlKey} activeKey={activeTerm} className='py-1' />
        </div>
      </Stack>
      <div className={`${style.TopTracksListWrapp} mt-4 mt-lg-4`}>
        <motion.div
          key={activeTerm}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: .05
              }
            }
          }}
        >
          <Row>
            {
              tracks.map((track, index) => (
                <Col md={6} xl={3} key={index}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Track track={track} parentUri={track.album.uri} showImage={true} className={style.TopTracksListWrappTrack} />
                  </motion.div>
                </Col>
              ))
            }
          </Row>
        </motion.div>
      </div>
    </div>
  )
}