"use client"
import { motion } from 'framer-motion'
import Playlist from '@/components/Playlists/Playlist'
import GenericSlider from '@/components/Slider/GenericSlider'
import style from "@/components/Playlists/GenericPlaylist.module.scss"
import { PlaylistInterface } from '@/lib/models/playlist.interface'
import { ReactNode } from 'react'

type Props = {
  itemsPerRow?: number
  title?: string | ReactNode
  className?: string,
  playlists: PlaylistInterface[]
}

export default function GenericPlaylists({
  itemsPerRow = 5,
  playlists = [],
  className = "",
  title = "",
}: Props) {

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`${style.PlaylistWrapp} ${className}`}
      variants={{
        visible: {
          transition: {
            staggerChildren: .05
          }
        }
      }}
    >
      {title ? <div>{title}</div> : null}
      <div className={`${title ? 'mt-3' : ''}`}>
        {
          playlists && playlists.length ?
            <GenericSlider slidesPerView={itemsPerRow}>
              {
                playlists.map((playlist, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Playlist playlist={playlist} />
                  </motion.div>
                ))
              }
            </GenericSlider>
            : <p>No Playlists found</p>
        }
      </div>
    </motion.div>
  )
}