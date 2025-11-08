import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {

  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  const { searchParams } = new URL(request.url)
  const market = searchParams.get('market')
  const additional_types = searchParams.get('additional_types') || ''

  url += 'me/player/currently-playing'
  url += `?market=${market}`
  additional_types ? url += `?additional_types=${additional_types}` : ''

  const currentPlaying = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then(async (resp) => {
      if (resp.status === 200) {
        return await resp.json()
          .then((res) => {
            return res
          })
      } else {
        return {}
      }
    })
  
  return NextResponse.json({ playing: currentPlaying })
}