import Playlist from '@/components/Playlists/Playlist'
import GenericAlbumsLoader from '@/components/Loader/GenericAlbumsLoader'
import GenericSlider from '@/components/Slider/GenericSlider'
import style from "@/components/Playlists/GenericPlaylist.module.scss"

export default function GenericPlaylists ({
  direction = "vertical",
  itemsPerRow = 5,
  playlists = [],
  className = "",
  title,
  isLoading = false,
}) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div className={`${style.PlaylistWrapp} ${className}`}>
      { title ? <div>{title}</div> : null }
      {
        isLoading ? <GenericAlbumsLoader sm={itemsPerRow} xs={6} />
        :
        <div className={`${title ? 'mt-5' : ''}`}>
          {
            playlists && playlists.length ?
              <GenericSlider
                slidesPerView={itemsPerRow}
                grid={{
                  fill: 'row',
                  rows: 2
                }}
              >
                {
                  playlists.map((playlist, index) => (
                    <Playlist playlist={playlist} key={index} />
                  ))
                }
              </GenericSlider>
            : <p>No Playlists found</p>
          }
        </div>
      }
    </div>
  )
}