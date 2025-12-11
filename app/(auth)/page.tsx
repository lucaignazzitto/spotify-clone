import pageBg from "@/public/images/bubble-2.jpg"
import TopTracks from "@/components/Me/Top/Tracks/Tracks"
import TopArtist from "@/components/Me/Top/Artists/Artists"
import FollowingArtist from "@/components/Me/Following/FollowingArtist"
import BackgroundHandler from "@/components/Backound/Handler"
import { UserTopTermsInterface } from "@/lib/models/user.interface"
import { cookies } from "next/headers"
import { TrackInterface } from "@/lib/models/track.interface"
import { ArtistInterface } from "@/lib/models/artist.inteface"

async function loadTops(type: string, range: UserTopTermsInterface, limit: number = 10): Promise<TrackInterface[] | ArtistInterface[]> {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/top/${type}?time_range=${range}&limit=${limit}`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 3600,
      tags: [`top-${type}`]
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

async function loadFollowing(limit?: number ) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/following?limit=${limit || 8}`, {
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

export default async function Home({ searchParams }: { searchParams: Promise<{ tracks_time_range?: UserTopTermsInterface, artists_time_range?: UserTopTermsInterface }> }) {
  const { tracks_time_range = "medium_term", artists_time_range = "medium_term" } = await searchParams
  const tracks = await loadTops('tracks', tracks_time_range, 4) as TrackInterface[]
  const artists = await loadTops('artists', artists_time_range, 8) as ArtistInterface[]
  const following = await loadFollowing() as ArtistInterface[]

  return (
    <div>
      <BackgroundHandler src={pageBg} />
      <h1 className="mb-0">Welcome</h1>
      <section className={`page-section`}>
        <TopTracks tracks={tracks} />
      </section>
      <section className={`page-section`}>
        <TopArtist artists={artists} />
      </section>
      <section className={`page-section`}>
        <FollowingArtist artists={following} />
      </section>
    </div>
  )
}
