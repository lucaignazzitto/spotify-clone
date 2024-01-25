import { Suspense } from "react"
import pageBg from "@/public/images/bubble-2.jpg"
import TopTracks from "@/components/Me/Top/Tracks/Tracks.js"
import TopArtist from "@/components/Me/Top/Artists/Artists.js"

// import TracksLoader from "@/components/Me/Top/Tracks/TracksLoader.js"
import TracksLoader from '@/components/Loader/TracksLoader'
import ArtistLoader from '@/components/Loader/ArtistLoader'
import FollowingArtist from "@/components/Me/Top/Following/FollowingArtist.js"

import style from "./Page.module.scss"

export default function Home() {
  return (
    <main className={style.Homepage}>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <h1 className={style.HomepageTitle}>Welcome</h1>
      <section className={`page-section`}>
        <Suspense fallback={<TracksLoader times={4} title="My top tracks" />}>
          <TopTracks />
        </Suspense>
      </section>
      <section className={`page-section`}>
        <Suspense fallback={<ArtistLoader times={4} md={3} sm={4} xs={6}  title="My top artists" />}>
          <TopArtist />
        </Suspense>
      </section>
      <section className={`page-section`}>
        <Suspense fallback={<ArtistLoader times={4} md={3} sm={4} xs={6} title="Following Artists" />}>
          <FollowingArtist />
        </Suspense>
      </section>
    </main>
  )
}
