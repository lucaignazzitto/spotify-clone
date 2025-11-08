import { cookies } from 'next/headers'
import GenericSlider from '@/components/Slider/GenericSlider'
import Artist from '@/components/Artists/Artist'
import style from "./FollowingArtist.module.scss"
import { ArtistInterface } from '@/lib/models/artist.inteface'


const limit = 6
async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/following?limit=${limit}`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 60,
      tags: ['following-artist']
    }
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { items = [] } = res?.artists
        return items
      })
  } else {
    return []
  }
}

export default async function FollowingArtist ({ className = "" }: { className?: string }) {
  const artists = await load() as ArtistInterface[]

  return (
    <div className={`${style.TopFollowingArtistsList} ${className}`}>
      <span className={`section-title`}>Following Artists</span>
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