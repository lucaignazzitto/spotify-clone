import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-3.jpg"
import BackgroundHandler from '@/components/Backound/Handler'
import { TrackInterface } from '@/lib/models/track.interface'
import QueueList from '@/components/Queue/List'
import { Metadata } from 'next'

async function loadQueue() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/player/queue`, {
    headers: { Cookie: (await cookies()).toString() },
    cache: 'no-store',
    next: {
      tags: ['queue']
    }
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

export function generateMetadata(): Metadata {
  return {
    title: "Queue"
  }
}

export default async function Queue () {
  const { currently_playing, queue = [] }: { currently_playing?: TrackInterface, queue: TrackInterface[] } = await loadQueue()
  
  return (
    <div>
      <BackgroundHandler src={pageBg} />
      <QueueList currently_playing={currently_playing} queue={queue} />
    </div>
  )
}
