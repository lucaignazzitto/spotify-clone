import Link from "next/link"
import PlayPause from "@/components/Me/Player/PlayPause"
import ImageFit from "@/components/Image/Fit.js"
import dayjs from "dayjs"
import style from "./GenericAlbum.module.scss"

export default function Album ({ album = {} }) {
  const [ big, medium, small ] = album?.images || []
  const image = big || medium || small

  return (
    <div className={style.albumWrapp}>
      <Link
      href={{
        pathname: `/albums/${album.id}`
      }}>
        <div className={style.albumWrappInner}>
          <div className={style.albumWrappInnerMedia}>
            <ImageFit url={image?.url} alt={`${album.name} Album cover `} />
            <PlayPause element={album} animate={false} className={style.albumWrappInnerMediaPlayer} />
          </div>
          <div className={style.albumWrappInnerTitle}>
            {album.name} • {album.total_tracks}
          </div>
          <div className={style.albumWrappInnerSubTitle}>Released: {dayjs(album.release_date).format('DD MMM YYYY')}</div>
        </div>
      </Link>
    </div>
  )
}