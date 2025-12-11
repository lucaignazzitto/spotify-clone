"use client"
import { motion } from 'framer-motion'
import Artist from '@/components/Artists/Artist'
import GenericSlider from '@/components/Slider/GenericSlider'
import ArtistLoader from '@/components/Loader/ArtistLoader'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { ReactNode } from 'react'

type Props = {
  direction: "vertical" | "horizontal"
  itemsPerRow?: number
  artists?: ArtistInterface[]
  className?: string
  title?: string | ReactNode
  showType?: boolean
  isLoading?: boolean
}

export default function Artists({
  direction = "vertical",
  itemsPerRow = 4,
  artists = [],
  className = "",
  title,
  showType = false,
  isLoading = false
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: .04
          }
        }
      }}
    >
      {title ? <div className='mb-3 mb-lg-4'>{title}</div> : null}
      {
        isLoading ? <ArtistLoader itemsPerRow={1} direction={direction} />
          :
          artists && artists.length ?
            <GenericSlider slidesPerView={itemsPerRow}>
              {
                artists.map((artist, index) => (
                  <motion.div
                    className='w-full'
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Artist artist={artist} showType={showType} />
                  </motion.div>
                ))
              }
            </GenericSlider>
            : <p>No artists found</p>
      }
    </motion.div>

  )
}