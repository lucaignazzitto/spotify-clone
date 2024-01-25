'use client'
import { observer } from "mobx-react-lite"
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
import PlayerStore from "@/stores/PlayerStore"
import PlayPause from "@/components/Me/Player/PlayPause"
import style from "./Tracks.module.scss"

function Track ({
  track = {},
  from = "album",
  playlistId = "",
  showLike = true,
  showImage = false,
  showNumber = false,
  showActive = true,
  showDuration = true,
  showOptions = false,
  numberLabel = '',
  className = ""
}) {
  track = (track && 'track' in track && Object.keys(track.track).length > 0) ? track.track : track || {}

  const [isActive, setIsActive] = useState(false)
  const [ large, medium, small ] = track?.album?.images || []
  const image = medium || large || small

  const duration = useMemo(() => {
    if (track?.duration_ms) {
      return millisToMinutesAndSeconds(track.duration_ms)
    } else {
      return ''
    }
  }, [track?.duration_ms])

  useEffect(() => {
    showActive && setIsActive(PlayerStore.isTrackActive(track?.uri))
  }, [, PlayerStore.getPlayer])

  return (
    Object.keys(track).length ?
      <div className={`track ${style.trackWrapp} ${showImage ? style.trackWrappHasImage : ''} ${showNumber ? style.trackWrappHasNumber : ''} ${isActive ? style.trackWrappIsActive : ''} ${showLike ? style.trackWrappShowLike : '' } ${className}`}>
        <div className={style.trackWrappPlayer}>
          <PlayPause element={track} size="small" />
        </div>
        {
          showActive && isActive ? <span className={`track-position ${style.trackWrappPosition}`}><Icon id="track-playing" width={15} /></span>
          : showNumber ? <span className={`track-position ${style.trackWrappPosition}`}>{ numberLabel || track.track_number}</span> : null
        }
        <div className={`track-inner ${style.trackWrappInner}`}>
          {
            showImage ? 
              <div className={`track-inner-placeholder ${style.trackWrappInnerPlaceholder}`}>
                { medium?.url ?
                  <ImageFit url={image.url} alt={`Cover extracted by ${track.album?.name || track.name}`} className={`track-inner-media ${style.trackWrappInnerMedia}`}/>
                  : null
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
                    {track.explicit ? <span className="explicit me-2">E </span> : null }
                    {track.name}
                  </span>
                </Link>
                : 
                <span className={`track-inner-content-album-title truncate-2 ${style.trackWrappInnerContentAlbumTitle}`}>
                  {track.explicit ? <span className="explicit me-2">E </span> : null }
                  {track.name}
                </span>
              }
              <div className={`track-inner-content-album-artist ${style.trackWrappInnerContentAlbumArtist}`}>
                <LinkToArtist artists={track.artists} />
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

export default observer(Track)