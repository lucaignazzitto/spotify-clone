import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function PUT(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  // state
  // track, context or off.
  // track will repeat the current track.
  // context will repeat the current context.
  // off will turn repeat off.
  const { device_id, state = "context" } = await request.json()

  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/player/repeat`
  url += `?device_id=${device_id}`
  url += `&state=${state}`

  const res = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
  
  
  return NextResponse.json(res)
}