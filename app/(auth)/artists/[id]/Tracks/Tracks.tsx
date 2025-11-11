import Track from '@/components/Tracks/Track'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { TrackInterface } from '@/lib/models/track.interface'
import { cookies } from 'next/headers'

const limit = 5
const market = 'IT'

async function load (artistId: ArtistInterface['id']) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}/top-tracks?market=${market}`, {
    headers: { Cookie: (await cookies()).toString() as string },
    next: {
      revalidate: 3600,
      tags: ['artist-top-tracks']
    }
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

export default async function Tracks ({ artistId }: { artistId: ArtistInterface['id'] }) {
  const tracks = await load(artistId) as TrackInterface[]

  return (
    <div>
      <span className={`section-title`}>Popular songs</span>
      <div className="mt-3 mt-lg-4">
        {
          tracks.map((track, index) => (
            <Track track={track} parentUri={track.album.uri} key={index} showImage={true} showNumber={true} showAlbum numberLabel={index + 1} showOptions={true} />
          ))
        }
        {
          tracks.length ? null : <p>No tracks found</p>
        }
      </div>
    </div>
  )
}