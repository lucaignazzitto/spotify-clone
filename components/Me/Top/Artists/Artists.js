import { cookies } from 'next/headers'
import GenericSlider from '@/components/Slider/GenericSlider'
import Artist from '@/components/Artists/Artist'
import style from "./Artists.module.scss"

const limit = 6
async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/top/artists?limit=${limit}`, {
    headers: { Cookie: cookies().toString() },
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
  const artists = await load()

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