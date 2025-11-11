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
    <div className={`${style.PlaylistWrapp} ${className}`}>
      {title ? <div>{title}</div> : null}
      <div className={`${title ? 'mt-3' : ''}`}>
        {
          playlists && playlists.length ?
            <GenericSlider slidesPerView={itemsPerRow}>
              {
                playlists.map((playlist, index) => (
                  <Playlist playlist={playlist} key={index} />
                ))
              }
            </GenericSlider>
            : <p>No Playlists found</p>
        }
      </div>
    </div>
  )
}