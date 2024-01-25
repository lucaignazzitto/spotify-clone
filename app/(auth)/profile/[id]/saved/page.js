import { cookies } from "next/headers"
import pageBg from "@/public/images/bubble-3.jpg"
import likedSongs from "@/public/images/liked-songs.png"
import GernericAlbumHero from "@/components/Hero/Album/GenericHero"
import Tracks from "@/components/Tracks/Tracks"
import style from "./Page.module.scss"

const market = 'IT'
const limit = 20

async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/tracks?market=${market}&limit=${limit}`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    const resp = await response.json()
    return  {
      album: {
        images: [{ url: likedSongs.src }],
        name: 'Brani che ti piacciono',
        type: 'playlist',
        total_tracks: resp.total
      },
      items: resp.items
    }
  } else {
    return {}
  }
}

export default async function SavedTracks({ params }) {
  const saved = await load()

  return (
    <main className={style.saveTracksPage}>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <GernericAlbumHero album={saved.album} showLike={false} />
      <section className={`page-section`}>
        <Tracks tracks={saved.items} showImage={true} showOptions={true} className={style.saveTracksPageTracks} />
      </section>
    </main>
  )
}
