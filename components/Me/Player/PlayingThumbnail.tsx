'use client'
import Link from "next/link"
import LinkToArtist from '@/components/Artists/LinkToArtist'
import style from "./PlayingTrack.module.scss"
import LinkToAlbum from "@/components/Artists/LinkToAlbum"
import Image from "next/image"
import { mediaPlaceholder } from "@/utils/helpers"
import { TrackInterface } from "@/lib/models/track.interface"

interface Props {
  track?: TrackInterface
  showLike?: boolean
  isLoading?: boolean
  className?: string
  handleClick?: () => void
}

function PlayingThumbnail({ track, className = "", handleClick = () => { } }: Props) {
  const [large, medium, small] = track?.album?.images || []
  const image = medium || small || large

  return (
    Object.keys(track || {}).length ?
      <button className={`btn btn-none ${style.PlayingThumbnail}`} onClick={handleClick}>
        <div className={`px-2 w-100 ${className}`}>
          <div>
            {image?.url ?
              <Image src={image.url} width={50} height={50} alt={`Cover extracted by ${track.album?.name || track.name}`} className={`img-fluid ${style.PlayingThumbnailMedia}`} placeholder='blur' blurDataURL={mediaPlaceholder} loading="lazy" />
              : null
            }
          </div>
          <div className={`${style.PlayingThumbnailInfos}`}>
            <Link href={`/albums/${track.album.id}`} className={`fs-10 truncate-2`}>
              <span>
                {track.explicit ? <span className="explicit me-2">E </span> : null}
                {track.name}
              </span>
            </Link>
            <div className={`fs-10 text-muted ${style.PlayingThumbnailInfosArtists}`}>
              <LinkToArtist artists={track.artists} className={style.PlayingThumbnailInfosArtistsArtist} />
              {track?.album?.id && <LinkToAlbum album={track.album} className={style.PlayingThumbnailInfosArtistsArtist} />}
            </div>
          </div>
        </div>
      </button>
      : null
  )
}

export default PlayingThumbnail