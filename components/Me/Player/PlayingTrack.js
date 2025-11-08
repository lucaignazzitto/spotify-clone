'use client'
import { observer } from "mobx-react-lite"
import Spinner from "@/components/Loader/Spinner"
import Link from "next/link"
import ImageFit from "@/components/Image/Fit"
import LinkToArtist from '@/components/Artists/LinkToArtist'
import LikeButton from '@/components/Buttons/Like'
import style from "./PlayingTrack.module.scss"
import LinkToAlbum from "@/components/Artists/LinkToAlbum"
import Image from "next/image"
import { mediaPlaceholder } from "@/utils/helpers"

function PlayingTrack ({ track = {}, showLike = true, isLoading = false, className = "", handleClick = () => {} }) {

  track = (track && 'track' in track) ? track.track : track || {}
  const [ large, medium, small ] = track?.album?.images || []
  const image = medium || large || small

  return (
    Object.keys(track).length ?
      <div className={`${style.PlayingTrackWrapp} ${showLike ? style.PlayingTrackWrappShowLike : '' } ${className}`}>
        <button className={`btn btn-none ${style.PlayingTrackWrappMobileDrawer}`} onClick={handleClick}></button>
        <div className={`${style.PlayingTrackWrappInner}`}>
          <div className={`${style.PlayingTrackWrappInnerPlaceholder}`}>
            { image?.url ?
              <Image src={image.url} width={60} height={60} alt={`Cover extracted by ${track.album?.name || track.name}`} className={`track-inner-media img-fluid ${style.PlayingTrackWrappInnerMedia}`} placeholder='blur' blurDataURL={mediaPlaceholder} loading="lazy" />
              : null
            }
          </div>
          <Link href={{
            pathname: `/albums/${track.album.id}`
          }} className={`${style.PlayingTrackWrappInnerTitle} truncate-2`}>
            <span>
              {track.explicit ? <span className="explicit me-2">E </span> : null }
              {track.name}
            </span>
          </Link>
          <div className={`${style.PlayingTrackWrappInnerArtist}`}>
            <LinkToArtist artists={track.artists} />
            { track?.album?.id && <><span>•</span><LinkToAlbum album={track.album} /></> }
          </div>
          {
            showLike ?
              <div className={`${style.PlayingTrackWrappInnerLike}`}>
                <LikeButton ids={track.id} aria-label={`Save track ${track.name}`} />
              </div>
            : null
          }
        </div>
      </div>
    : <span className={`${style.PlayingTrackNoTrack}`}>
        {
          isLoading ?
          <div className='d-flex align-items-center'>
            <Spinner width={20} height={20} show={isLoading} className='me-2' />
            <span><b>Loading player</b></span>
          </div>
          : 'No device connected'}
      </span>
  )
}

export default observer(PlayingTrack)