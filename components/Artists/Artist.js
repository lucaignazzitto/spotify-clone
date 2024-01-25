import Link from "next/link"
import ImageFit from "@/components/Image/Fit.js"

import style from "./Artist.module.scss"

export default function Artist ({ artist, showType = false }) {
  const [ big, medium, small ] = artist?.images
  const image = big || medium || small

  return (
    <div className={style.ArtistWrapp}>
      <Link href={{
        pathname: `/artists/${artist.id}`
      }}>
        <div className={style.ArtistWrappInner}>
          <div className={style.ArtistWrappInnerMedia}>
            <ImageFit url={image?.url} alt={`Cover photo of ${artist.name}`} />
            { showType ? <div className={style.ArtistWrappInnerType}>{artist.type}</div> : null }
          </div>
          <div className={style.ArtistWrappInnerTitle}>{artist.name}</div>
        </div>
      </Link>
    </div>
  )
}