import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-3.jpg"
import BackgroundHandler from '@/components/Backound/Handler'
import RecentlyList from '@/components/Recents/List'
import { Metadata } from 'next'

const LIMIT = 20

async function loadRecents() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/player/recently?limit=${LIMIT}`, {
    headers: { Cookie: (await cookies()).toString() },
    cache: 'no-store'
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

export function generateMetadata(): Metadata {
  return {
    title: "Recently played"
  }
}

export default async function Queue() {
  const tracks = await loadRecents()

  return (
    <div>
      <BackgroundHandler src={pageBg} />
      <RecentlyList tracks={tracks} />
    </div>
  )
}
