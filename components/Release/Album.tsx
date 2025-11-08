import Link from "next/link"
import PlayPause from "@/components/Me/Player/PlayPause"
import dayjs from "dayjs"
import style from "./ReleaseAlbum.module.scss"
import { AlbumInterface } from "@/lib/models/album.inteface"
import { mediaPlaceholder } from "@/utils/helpers"
import Image from "next/image"
import LinkToArtist from "../Artists/LinkToArtist"

interface Props {
  album: AlbumInterface
  useType?: boolean
}

export default function ReleaseAlbum({ album, useType = false }: Props) {
  const [big, medium, small] = album?.images || []
  const image = big || medium || small

  return (
    <div className={style.albumWrapp}>
      <div className={style.albumWrappInner}>
        <div className={style.albumWrappInnerMedia}>
          <Link href={`/albums/${album.id}`}>
            <Image src={image?.url} width={120} height={120} placeholder='blur' blurDataURL={mediaPlaceholder} loading="lazy" alt={`${album.name} Album cover `} className='img-fluid' />
          </Link>
          <PlayPause element={album} animate={false} className={style.albumWrappInnerMediaPlayer} aria-label={`Play album ${album.name}`} />
        </div>
        <div className={style.albumWrappInnerContent}>
          <Link href={`/albums/${album.id}`}>
            <div className={style.albumWrappInnerContentTitle}>
              {album.name}
            </div>
          </Link>
          <LinkToArtist artists={album.artists} className={style.albumWrappInnerContentSubTitle} />
          <div className={style.albumWrappInnerContentSubTitle}><span className="text-uppercase">{album.album_type}</span> • {dayjs(album.release_date).format('DD MMM YYYY')}</div>
        </div>
      </div>
    </div>
  )
}