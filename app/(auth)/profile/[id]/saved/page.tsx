import { cookies } from "next/headers"
import pageBg from "@/public/images/bubble-3.jpg"
import likedSongs from "@/public/images/liked-songs.png"
import GernericAlbumHero from "@/components/Hero/Album/GenericHero"
import Tracks from "@/components/Tracks/Tracks"
import style from "./Page.module.scss"
import BackgroundHandler from "@/components/Backound/Handler"
import { TrackInterface } from "@/lib/models/track.interface"
import { AlbumInterface } from "@/lib/models/album.inteface"
import { Metadata } from "next"
import { PlaylistInterface } from "@/lib/models/playlist.interface"

const market = 'IT'
const limit = 20

async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/tracks?market=${market}&limit=${limit}`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      tags: ['saved-tracks']
    }
  })
   
  if (response.ok) {
    const resp = await response.json()
    return  {
      album: {
        images: [{ url: likedSongs.src }],
        name: 'Songs you like',
        type: 'playlist',
        total_tracks: resp.total
      } as AlbumInterface,
      items: resp.items.map(i => ({ ...i.track, added_at: i.added_at })) as TrackInterface[]
    }
  } else {
    return {}
  }
}

export function generateMetadata(): Metadata {
  return {
    title: "Songs you like",
  }
}

export default async function SavedTracks() {
  const saved = await load()

  return (
    <div className={style.saveTracksPage}>
      <BackgroundHandler src={pageBg} />
      <GernericAlbumHero album={saved.album} showLike={false} />
      <section className={`page-section`}>
        <Tracks tracks={saved.items} showImage={true} showOptions={true} className={style.saveTracksPageTracks} />
      </section>
    </div>
  )
}
