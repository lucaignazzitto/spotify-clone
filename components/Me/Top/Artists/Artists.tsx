"use client"
import GenericSlider from '@/components/Slider/GenericSlider'
import Artist from '@/components/Artists/Artist'
import style from "./Artists.module.scss"
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { Stack } from 'react-bootstrap'
import UrlPicker from '@/components/Picker/UrlPicker'
import { motion } from 'framer-motion'
import { TOP_TERMS } from '../Tracks/Tracks'
import { useSearchParams } from 'next/navigation'

export default function MyTopArtist({ artists, className = "", urlKey = "artists_time_range" }: {
  artists: ArtistInterface[],
  className?: string
  urlKey?: string
}) {
  const searchParams = useSearchParams()
  const activeTerm = searchParams.get(urlKey) || "medium_term"

  return (
    <div className={`${style.TopArtistsList} ${className}`}>
      <Stack direction="vertical" className="flex-md-row align-md-items-center justify-content-md-between" gap={3}>
        <span className={`section-title`}>My top artists</span>
        <div className='d-flex align-items-center gap-3'>
          <UrlPicker options={TOP_TERMS} urlKey={urlKey} activeKey={activeTerm} className='py-1' />
        </div>
      </Stack>
      <div className={`mt-4`}>
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
          <GenericSlider>
            {
              artists.map((artist, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Artist artist={artist} />
                </motion.div>
              ))
            }
          </GenericSlider>
        </motion.div>
      </div>
    </div>
  )
}