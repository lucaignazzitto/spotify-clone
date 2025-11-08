import { cookies } from 'next/headers'
import GenericSlider from '@/components/Slider/GenericSlider'
import Artist from '@/components/Artists/Artist'
import style from "./Artists.module.scss"
import { ArtistInterface } from '@/lib/models/artist.inteface'

const limit = 6
async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/top/artists?limit=${limit}`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 3600,
      tags: ['top-artist']
    }
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { items = [] } = res
        return items
      })
  } else {
    return []
  }
}

export default async function MyTopArtist ({ className = "" }) {
  const artists = await load() as ArtistInterface[]

  return (
    <div className={`${style.TopArtistsList} ${className}`}>
      <span className={`section-title`}>My top artists</span>
      <div className={`mt-4 mt-lg-5`}>
        <GenericSlider>
        {
          artists.map((artist, index) => (
            <Artist artist={artist} key={index} />
          ))
        }
        </GenericSlider>
      </div>
    </div>
  )
}