import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function PUT(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { device_id, position_ms } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/player/seek`
  url += `?device_id=${device_id}`
  url += `&position_ms=${position_ms}`

  const res = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      device_id
    })
  })
  
  return NextResponse.json(res)
}