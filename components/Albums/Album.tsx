import Link from "next/link"
import PlayPause from "@/components/Me/Player/PlayPause"
import dayjs from "dayjs"
import style from "./GenericAlbum.module.scss"
import { AlbumInterface } from "@/lib/models/album.inteface"
import { mediaPlaceholder } from "@/utils/helpers"
import Image from "next/image"

interface Props {
  album: AlbumInterface
  useType?: boolean
}

export default function Album({ album, useType = false }: Props) {
  const [big, medium, small] = album?.images || []
  const image = big || medium || small

  return (
    <div className={style.albumWrapp}>
      <Link
        href={{
          pathname: `/albums/${album.id}`
        }}>
        <div className={style.albumWrappInner}>
          <div className={style.albumWrappInnerMedia}>
            <Image src={image?.url} width={600} height={600} placeholder='blur' blurDataURL={mediaPlaceholder} loading="lazy" alt={`${album.name} Album cover `}className='img-fluid' />
            <PlayPause element={album} animate={false} className={style.albumWrappInnerMediaPlayer} />
          </div>
          <div className={style.albumWrappInnerTitle}>
            {album.name} • {album.total_tracks}
          </div>
          <div className="d-flex align-items-center">
            { useType && album.album_type ? <div className={style.albumWrappInnerSubTitle}>• {album.album_type}</div> : null }
            <div className={style.albumWrappInnerSubTitle}>Released: {dayjs(album.release_date).format('DD MMM YYYY')}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}