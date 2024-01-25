import dayjs from 'dayjs'
import PlayPause from "@/components/Me/Player/PlayPause"
import PlayerStore from "@/stores/PlayerStore"
import ShuffleButton from "@/components/Me/Player/Shuffle"
import LikeButton from '@/components/Buttons/Like'
import ImageFlat from '@/components/Image/FlatImage'

import style from "./GenericHero.module.scss"

export default function GenericAlbumHero ({ album = {}, type = "album", showLike = true }) {
  const [ heroImage = {} ] = album?.images || []

  return (
    <div className={style.GernericAlbumHeroWrapper}>
      {
        Object.keys(album).length ?
        <>
          <div className={style.GernericAlbumHeroWrapperRowTitle}>
            { heroImage && heroImage.url ? 
              <div className={style.GernericAlbumHeroWrapperHeroBack}>
                <ImageFlat fill sizes="100vw" src={heroImage.url} alt={`${album.name} type image`} className="position-relative img-fluid" />
              </div> : null
            }
            <div className={style.GernericAlbumHeroWrapperInfo}>
              <span className={style.GernericAlbumHeroWrapperInfoType}>{album.type}</span>
              <div>
                <h1 className={style.GernericAlbumHeroWrapperInfoTitle}>{album.name}</h1>
              </div>
              {
                type === "album" ?
                  <span className={style.GernericAlbumHeroWrapperInfoType}>Released on <b>{dayjs(album.release_date).format('MMM YYYY')}</b> - <b>{album.total_tracks} tracks</b></span>
                :
                <>
                  <p className={style.GernericAlbumHeroWrapperInfoDescription}>{album.description}</p>
                  <p className={style.GernericAlbumHeroWrapperInfoRelease}>
                    { album?.owner?.display_name ? `Created by ${album.owner.display_name} – ` : null }
                    <b>{album.total_tracks || album.tracks.total} tracks</b>
                  </p>
                </>
              }
            </div>
          </div>
          <div className={style.GernericAlbumHeroWrapperControllers}>
            <div className={style.GernericAlbumHeroWrapperControllersLine}>
              <PlayPause element={album} />
            </div>
            <div className={style.GernericAlbumHeroWrapperControllersLine}>
              <ShuffleButton />
            </div>
            <div className={style.GernericAlbumHeroWrapperControllersLine}>
              { type === "album" && showLike ? <LikeButton ids={album.id} type={type} /> : null }
            </div>
          </div>
        </>
        : <p>No album found</p>
      }
    </div>
  )
}