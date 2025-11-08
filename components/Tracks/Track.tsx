'use client'
import { useState, useEffect, useMemo } from "react"
import { millisToMinutesAndSeconds } from '@/utils/helpers'
import Link from "next/link"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Icon from "@/components/Image/Icon"
import LikeButton from '@/components/Buttons/Like'
import ImageFit from "@/components/Image/Fit"
import LinkToArtist from '@/components/Artists/LinkToArtist'
import Options from "./Options/Options"
import PlayPause from "@/components/Me/Player/PlayPause"
import style from "./Tracks.module.scss"
import { TrackInterface } from "@/lib/models/track.interface"
import { mediaPlaceholder } from "@/utils/helpers"
import { useSpotifyPlayer } from "@/contexts/SpotifyPlayerContext"
import LinkToAlbum from "../Artists/LinkToAlbum"
import Image from "next/image";

interface Props {
  parentUri?: string
  track?: TrackInterface,
  from?: string,
  playlistId?: string,
  useHoverAnimation?: boolean
  showLike?: boolean
  showPlay?: boolean
  showImage?: boolean
  showAlbum?: boolean
  showNumber?: boolean
  showActive?: boolean
  showDuration?: boolean
  showOptions?: boolean
  numberLabel?: number | string,
  className?: string,
}

function Track({
  track,
  from = "album",
  parentUri = "",
  playlistId = "",
  showPlay = true,
  useHoverAnimation = true,
  showLike = true,
  showAlbum = false,
  showImage = false,
  showNumber = false,
  showActive = true,
  showDuration = true,
  showOptions = false,
  numberLabel = '',
  className = ""
}: Props) {
  const { player, track: playingTrack } = useSpotifyPlayer() as any
  const [isActive, setIsActive] = useState(false)
  const [large, medium, small] = track?.album?.images || []
  const image = medium || large || small

  const duration = useMemo(() => {
    if (track?.duration_ms) {
      return millisToMinutesAndSeconds(track.duration_ms)
    } else {
      return ''
    }
  }, [track?.duration_ms])

  useEffect(() => {
    showActive && setIsActive(playingTrack?.uri === track?.uri)
  }, [showActive, player])

  return (
    Object.keys(track || {}).length ?
      <div className={`track ${style.trackWrapp} ${useHoverAnimation ? style.trackWrappHoverAnim : ''} ${showImage ? style.trackWrappHasImage : ''} ${showNumber ? style.trackWrappHasNumber : ''} ${isActive ? style.trackWrappIsActive : ''} ${showLike ? style.trackWrappShowLike : ''} ${className}`}>
        {
          showPlay &&
          <div className={style.trackWrappPlayer}>
            <PlayPause element={track} parentUri={parentUri} size="small" />
          </div>
        }
        {
          showActive && isActive ? <span className={`track-position ${style.trackWrappPosition}`}><Icon id="track-playing" width={15} /></span>
            : showNumber ? <span className={`track-position ${style.trackWrappPosition}`}>{numberLabel || track.track_number}</span> : null
        }
        <div className={`track-inner ${style.trackWrappInner}`}>
          {
            showImage ?
              <div className={`track-inner-placeholder ${style.trackWrappInnerPlaceholder}`}>
                {medium?.url &&
                  <Image
                    src={image.url}
                    width={90}
                    height={90}
                    alt={`Cover extracted by ${track.album?.name || track.name}`}
                    className={`track-inner-media ${style.trackWrappInnerMedia}`}
                    placeholder="blur"
                    blurDataURL={mediaPlaceholder}
                    loading="lazy"
                  />
                }
              </div>
              : null
          }
          <div className={`track-inner-content ${style.trackWrappInnerContent}`}>
            <div className={`track-inner-content-album ${style.trackWrappInnerContentAlbum}`}>
              {
                track?.album?.id ?
                  <Link href={{
                    pathname: `/albums/${track.album.id}`
                  }}>
                    <span className={`track-inner-content-album-title truncate-2 ${style.trackWrappInnerContentAlbumTitle}`}>
                      {track.explicit ? <span className="explicit me-2">E </span> : null}
                      {track.name}
                    </span>
                  </Link>
                  :
                  <span className={`track-inner-content-album-title truncate-2 ${style.trackWrappInnerContentAlbumTitle}`}>
                    {track.explicit ? <span className="explicit me-2">E </span> : null}
                    {track.name}
                  </span>
              }
              <div className={`track-inner-content-album-artist ${style.trackWrappInnerContentAlbumArtist}`}>
                <LinkToArtist artists={track.artists} />
                {(track?.album?.id && showAlbum) && <>• <LinkToAlbum album={track.album} /></>}
              </div>
            </div>
            {
              showLike ?
                <div className={`track-inner-content-like ${style.trackWrappInnerContentLike}`}>
                  <LikeButton ids={track.id} />
                </div>
                : null
            }
            {
              showDuration ?
                <span className={`track-inner-content-duration ${style.trackWrappInnerContentDuration}`}>
                  {duration}
                </span>
                : null
            }
          </div>
          {
            showOptions ?
              <span className={`track-inner-content-queue ${style.trackWrappInnerContentQueue}`}>
                <OverlayTrigger trigger="click" rootClose={true} placement="bottom-end" overlay={
                  <Popover>
                    <Popover.Body>
                      <Options track={track} from={from} playlistId={playlistId} />
                    </Popover.Body>
                  </Popover>
                }>
                  <button className="btn btn-none">
                    <Icon id="dots" width={20} />
                  </button>
                </OverlayTrigger>
              </span>
              : null
          }
        </div>
      </div>
      : <p className="mb-0">No track found</p>
  )
}

export default Track