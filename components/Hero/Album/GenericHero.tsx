import dayjs from 'dayjs'
import PlayPause from "@/components/Me/Player/PlayPause"
import ShuffleButton from "@/components/Me/Player/Shuffle"
import LikeButton from '@/components/Buttons/Like'

import style from "./GenericHero.module.scss"
import Image from 'next/image'
import { mediaPlaceholder } from '@/utils/helpers'
import { AlbumInterface } from '@/lib/models/album.inteface'
import { PlaylistInterface } from '@/lib/models/playlist.interface'

interface Props {
  album: PlaylistInterface | AlbumInterface
  type?: string
  showExtras?: boolean
  showLike?: boolean
  showPlay?: boolean
  showShuffle?: boolean
}

export default function GenericAlbumHero ({ album, type = "album", showExtras = true, showLike = true, showPlay = true, showShuffle = true }: Props) {
  const heroImage = album?.images?.[0] || null

  return (
    <div className={style.GernericAlbumHeroWrapper}>
      {
        Object.keys(album).length ?
        <>
          <div className={style.GernericAlbumHeroWrapperRowTitle}>
            { heroImage && heroImage.url ? 
              <div className={style.GernericAlbumHeroWrapperHeroBack}>
                <Image width={200} height={200} src={heroImage.url} alt={`${album.name} type image`} className="position-relative img-fluid" placeholder='blur' blurDataURL={mediaPlaceholder} />
              </div> : null
            }
            <div className={style.GernericAlbumHeroWrapperInfo}>
              <span className={style.GernericAlbumHeroWrapperInfoType}>{album.type}</span>
              <div>
                <h1 className={style.GernericAlbumHeroWrapperInfoTitle}>{album.name}</h1>
              </div>
              {
                showExtras ?
                  type === "album" ?
                    <span className={style.GernericAlbumHeroWrapperInfoType}>Released on <b>{dayjs((album as AlbumInterface).release_date).format('MMM YYYY')}</b> - <b>{(album as AlbumInterface).total_tracks} tracks</b></span>
                  :
                  <>
                    <p className={style.GernericAlbumHeroWrapperInfoDescription}>{(album as PlaylistInterface).description}</p>
                    <p className={style.GernericAlbumHeroWrapperInfoRelease}>
                      { (album as PlaylistInterface)?.owner?.display_name ? `Created by ${(album as PlaylistInterface).owner.display_name} – ` : null }
                      <b>{(album as PlaylistInterface).tracks.total} tracks</b>
                    </p>
                  </>
                : null
              }
            </div>
          </div>
          <div className={style.GernericAlbumHeroWrapperControllers}>
            { showPlay &&
              <div className={style.GernericAlbumHeroWrapperControllersLine}>
                <PlayPause element={album} aria-label={`Play album ${album.name}`} />
              </div>
            }
            {
              showShuffle && 
              <div className={style.GernericAlbumHeroWrapperControllersLine}>
                <ShuffleButton />
              </div>
            }
            <div className={style.GernericAlbumHeroWrapperControllersLine}>
              { type === "album" && showLike ? <LikeButton ids={album.id} type={type} aria-label={`Save track ${album.name}`} /> : null }
            </div>
          </div>
        </>
        : <p>No album found</p>
      }
    </div>
  )
}