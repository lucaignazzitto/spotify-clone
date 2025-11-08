import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function PUT(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { device_id, volume_percent = 100 } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/player/volume`
  url += `?device_id=${device_id}`
  url += `&volume_percent=${volume_percent}`

  const res = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      device_id,
      volume_percent
    })
  })
    .then((res) => {
      return res
    })
  
  return NextResponse.json(res)
}