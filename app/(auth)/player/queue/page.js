import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-3.jpg"
import Tracks from '@/components/Tracks/Tracks'
import Track from '@/components/Tracks/Track'
// import style from "./Page.module.scss"

async function loadQueue(id) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/player/queue`, {
    headers: { Cookie: cookies().toString() },
    cache: 'no-store'
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        return res.playerQueue
      })
  } else {
    return []
  }
}

export default async function Queue ({ params }) {
  const { currently_playing = {}, queue = [] } = await loadQueue()

  return (
    <main>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <h1 className="page-title">Queue</h1>
      <section className={`page-section`}>
        <span className={`section-title`}>Now listening</span>
        <div className={`mt-4`}>
          <Track track={currently_playing || {}} showImage={true} />
        </div>
      </section>
      <section className={`page-section`}>
        <span className={`section-title`}>Next on queue</span>
        <Tracks
          className={`mt-4`}
          itemsPerRow={1}
          tracks={queue}
          showImage
          showActive={false}
          showNumber
          showOptions
          useLoopAsNumber
        />
      </section>
    </main>
  )
}
