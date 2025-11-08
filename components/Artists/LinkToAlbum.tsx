import Link from "next/link"
import style from "./LinkToArtist.module.scss"
import { AlbumInterface } from "@/lib/models/album.inteface"

export default function LinkToAlbum({ album, className = "" }: { album: AlbumInterface, className?: string }) {
  return (
    <div className={`${style.LinkToArtistWrapp} ${className}`}>
      <Link href={`/albums/${album.id}`}>
        {album.name}
      </Link>
    </div>
  )
}