"use client"
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import PlayPause from "@/components/Me/Player/PlayPause"
import ShuffleButton from "@/components/Me/Player/Shuffle"
import LikeButton from '@/components/Buttons/Like'

import style from "./GenericHero.module.scss"
import Image from 'next/image'
import { mediaPlaceholder } from '@/utils/helpers'
import { AlbumInterface } from '@/lib/models/album.inteface'
import { PlaylistInterface } from '@/lib/models/playlist.interface'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { Stack } from 'react-bootstrap'
import ArtistAvatar from '@/components/Artists/Avatar'

interface Props {
  album: PlaylistInterface | AlbumInterface
  artists?: ArtistInterface[]
  type?: string
  showExtras?: boolean
  showLike?: boolean
  showPlay?: boolean
  showShuffle?: boolean
}

export default function GenericAlbumHero({ album, artists = [], type = "album", showExtras = true, showLike = true, showPlay = true, showShuffle = true }: Props) {
  const heroImage = album?.images?.[0] || null

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={style.GernericAlbumHeroWrapper}
      variants={{
        visible: {
          transition: {
            staggerChildren: .04
          }
        }
      }}
    >
      <div className={style.GernericAlbumHeroWrapperRowTitle}>
        <motion.div className={style.GernericAlbumHeroWrapperHeroBack}
          variants={{
            hidden: { opacity: 0, scale: 1.1 },
            visible: { opacity: 1, scale: 1 }
          }}>
          <Image width={200} height={200} src={heroImage?.url} alt={`${album.name} type image`} className="position-relative img-fluid" placeholder='blur' blurDataURL={mediaPlaceholder} />
        </motion.div>
        <div className={style.GernericAlbumHeroWrapperInfo}>
          <Stack direction="vertical" className='justify-content-center' gap={{ xs: 2, lg: 3 }}>
            <motion.h1 className={style.GernericAlbumHeroWrapperInfoTitle}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}>
              {album.name}
            </motion.h1>
            {
              artists.length > 0 &&
              <motion.div variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}>
                <Stack direction="horizontal" gap={2}>
                  {
                    artists?.map(artist => (
                      <ArtistAvatar key={artist.id} artist={artist} />
                    ))
                  }
                </Stack>
              </motion.div>
            }
            {
              showExtras &&
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}>
                {
                  type === "album" ?
                    <span className={style.GernericAlbumHeroWrapperInfoType}>{(album as AlbumInterface).release_date && <span>Released on <b>{dayjs((album as AlbumInterface).release_date).format('MMM YYYY')}</b> - </span>}<b>{(album as AlbumInterface).total_tracks} tracks</b></span>
                    :
                    <div>
                      <p className={style.GernericAlbumHeroWrapperInfoDescription}>{(album as PlaylistInterface).description}</p>
                      <p className={style.GernericAlbumHeroWrapperInfoRelease}>
                        {(album as PlaylistInterface)?.owner?.display_name ? `Created by ${(album as PlaylistInterface).owner.display_name} – ` : null}
                        <b>{(album as PlaylistInterface).tracks.total} tracks</b>
                      </p>
                    </div>
                }
              </motion.div>
            }
          </Stack>
        </div>
      </div>
      <div className={style.GernericAlbumHeroWrapperControllers}>
        {showPlay &&
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
          {type === "album" && showLike ? <LikeButton ids={album.id} type={type} aria-label={`Save track ${album.name}`} iconProps={{ width: 24, height: 24 }} /> : null}
        </div>
      </div>
    </motion.div>
  )
}