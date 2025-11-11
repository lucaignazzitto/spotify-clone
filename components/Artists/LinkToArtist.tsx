import React from "react"
import Link from "next/link"
import style from "./LinkToArtist.module.scss"
import { ArtistInterface } from "@/lib/models/artist.inteface"

interface Props {
  artists: Pick<ArtistInterface, 'name' | 'id'>[],
  className?: string
}

export default function LinkToArtist({ artists = [], className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      {artists.map((artist, index) => (
        <React.Fragment key={index}>
          <Link key={index} href={{ pathname: `/artists/${artist.id}` }} className="hover:underline">
            {artist.name}
          </Link>
          {artists.length !== index + 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </div>
  )
}