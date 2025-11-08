import Link from "next/link"
import style from "./Artist.module.scss"
import Image from "next/image"
import { mediaPlaceholder } from "@/utils/helpers"
import { ArtistInterface } from "@/lib/models/artist.inteface"

interface Props {
  artist: ArtistInterface,
  showType?: boolean
}

export default function Artist({ artist, showType = false }: Props) {
  const [big, medium, small] = artist?.images
  const image = big || medium || small

  return (
    <div className={style.ArtistWrapp}>
      <Link href={{
        pathname: `/artists/${artist.id}`
      }}>
        <div className={style.ArtistWrappInner}>
          <div className={style.ArtistWrappInnerMedia}>
            <Image
              src={image?.url}
              width={300}
              height={300}
              alt={`Cover photo of ${artist.name}`}
              placeholder="blur"
              blurDataURL={mediaPlaceholder}
              className="img-fluid w-100"
              style={{ aspectRatio: 1 }}
            />
            {showType ? <div className={style.ArtistWrappInnerType}>{artist.type}</div> : null}
          </div>
          <div className={style.ArtistWrappInnerTitle}>{artist.name}</div>
        </div>
      </Link>
    </div>
  )
}