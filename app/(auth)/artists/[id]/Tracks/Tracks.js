import { cookies } from 'next/headers'
import Track from '@/components/Tracks/Track'

const limit = 4
const market = 'IT'

async function load (artistId) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}/top-tracks?market=${market}`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        const { tracks = [] } = res
        return tracks.slice(0, limit)
      })
  } else {
    return []
  }
}

export default async function Tracks ({ artistId }) {
  const tracks = await load(artistId)

  return (
    <div>
      <span className={`section-title`}>POPULAR SONGS</span>
      <div className="mt-4 mt-lg-5">
        {
          tracks.map((track, index) => (
            <Track track={track} key={index} showImage={true} showNumber={true} numberLabel={index + 1} showOptions={true} />
          ))
        }
        {
          tracks.length ? null : <p>No tracks found</p>
        }
      </div>
    </div>
  )
}