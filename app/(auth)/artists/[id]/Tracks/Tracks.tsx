import Tracks from '@/components/Tracks/Tracks'
import { ArtistInterface } from '@/lib/models/artist.inteface'
import { TrackInterface } from '@/lib/models/track.interface'
import { cookies } from 'next/headers'

const LIMIT = 5
const MARKET = 'IT'

async function load (artistId: ArtistInterface['id']) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/artists/${artistId}/top-tracks?market=${MARKET}&limit=${LIMIT}`, {
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
        return tracks
      })
  } else {
    return []
  }
}

export default async function ArtistsTracks ({ artistId, title = "Popular songs" }: { artistId: ArtistInterface['id'], title?: string }) {
  const tracks = await load(artistId) as TrackInterface[]

  return (
    <div>
      <span className={`section-title`}>{title}</span>
      <div className="mt-3 mt-lg-4">
        <Tracks tracks={tracks} showImage={true} showNumber={true} showAlbum useLoopAsNumber showOptions={true} />
        {
          tracks.length ? null : <p>No tracks found</p>
        }
      </div>
    </div>
  )
}