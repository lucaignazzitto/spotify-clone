import pageBg from "@/public/images/bubble-2.jpg"
import TopTracks from "@/components/Me/Top/Tracks/Tracks"
import TopArtist from "@/components/Me/Top/Artists/Artists"
import FollowingArtist from "@/components/Me/Top/Following/FollowingArtist"
import BackgroundHandler from "@/components/Backound/Handler"

export default function Home() {
  return (
    <div>
      <BackgroundHandler src={pageBg} />
      <h1 className="mb-0">Welcome</h1>
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
