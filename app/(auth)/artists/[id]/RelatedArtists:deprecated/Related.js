import Link from "next/link"
import ImageFit from "@/components/Image/Fit"
import style from "./Related.module.scss"

export default function Related ({ artist }) {
  const [ big, medium, small ] = artist?.images
  const image = big || medium || small
  
  return (
    <div className={style.relatedArtistWrapp}>
      <Link href={{
        pathname: `/artists/${artist.id}`
      }}>
        <div className={style.relatedArtistWrappInner}>
          <div className={style.relatedArtistWrappInnerMedia}>
            <ImageFit url={image?.url} alt={`Cover photo of ${artist.name}`} />
          </div>
          <div className={style.relatedArtistWrappInnerTitle}>{artist.name}</div>
        </div>
      </Link>
    </div>
  )
}