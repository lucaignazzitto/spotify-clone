import pageBg from "@/public/images/bubble-2.jpg"
import TopTracks from "@/components/Me/Top/Tracks/Tracks"
import TopArtist from "@/components/Me/Top/Artists/Artists"
import FollowingArtist from "@/components/Me/Top/Following/FollowingArtist"
import style from "./Page.module.scss"
import BackgroundHandler from "@/components/Backound/Handler"

export default function Home() {
  return (
    <div className={style.Homepage}>
      <BackgroundHandler src={pageBg} />
      <h1 className={style.HomepageTitle}>Welcome</h1>
      <section className={`page-section`}>
        <TopTracks />
      </section>
      <section className={`page-section`}>
        <TopArtist />
      </section>
      <section className={`page-section`}>
        <FollowingArtist />
      </section>
    </div>
  )
}
