"use client"
import GenericSlider from '@/components/Slider/GenericSlider'
import Artist from '@/components/Artists/Artist'
import style from "./FollowingArtist.module.scss"
import { motion } from 'framer-motion'
import { ArtistInterface } from '@/lib/models/artist.inteface'

export default function FollowingArtist({ artists, className = "" }: { artists: ArtistInterface[], className?: string }) {

  return (
    <div className={`${style.TopFollowingArtistsList} ${className}`}>
      <span className={`section-title`}>Following Artists</span>
      <div className={`mt-3 mt-lg-4`}>
        <motion.div
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