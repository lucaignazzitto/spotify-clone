import { cookies } from 'next/headers'
import LyricsText from '@/components/Lyrics/Lyrics'

async function getLyrics(trackId: string | number) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/lyrics/${trackId}`, {
    headers: { 
      Cookie: (await cookies()).toString()
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

export default async function LyricsPage ({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const resp  = await getLyrics(id)

  return (
    <div>
      <div className="page-background" style={{ backgroundImage: `url("https://i.scdn.co/image/ab67616d00001e026ef6ad26898a6eace34a216c")`}}></div>
      <LyricsText lyrics={resp.lyrics_body} />
    </div>
  )
}
