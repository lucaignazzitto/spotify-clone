import { cookies } from 'next/headers'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GenericSlider from '@/components/Slider/GenericSlider'
import Artist from '@/components/Artists/Artist'
import style from "./FollowingArtist.module.scss"


const limit = 6
async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/following?limit=${limit}`, {
    headers: { Cookie: cookies().toString() },
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

export default async function FollowingArtist ({ className = "" }) {
  const artists = await load()

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