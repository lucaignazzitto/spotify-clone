import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-4.jpg"
import LyricsText from '@/components/Lyrics/Lyrics'
// import style from "./Page.module.scss"

async function getLyrics(trackId) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/lyrics/${trackId}`, {
    headers: { 
      Cookie: cookies().toString()
    }
  })
   
  if (response.ok) {
    return response.json()
      .then((res) => {
        return res
      })
  } else {
    return []
  }
}

export default async function LyricsPage ({ params }) {
  const resp  = await getLyrics(params.id)

  return (
    <main>
      <div className="page-background" style={{ backgroundImage: `url("https://i.scdn.co/image/ab67616d00001e026ef6ad26898a6eace34a216c")`}}></div>
      <LyricsText lyrics={resp.lyrics_body} />
    </main>
  )
}
