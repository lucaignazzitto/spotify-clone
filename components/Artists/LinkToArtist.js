import React from "react"
import Link from "next/link"
import style from "./LinkToArtist.module.scss"

export default function LinkToArtist ({ artists = [], className = "" }) {
  return (
    <div className={`${style.LinkToArtistWrapp} ${className}`}>
      {artists.map((artist, index) => (
        <React.Fragment key={index}>
          <Link key={index} href={{
            pathname: `/artists/${artist.id}`
          }}>
            {artist.name}
          </Link>
          {artists.length !== index + 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </div>
  )
}