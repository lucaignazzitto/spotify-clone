import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function PUT(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  const params = await request.json()
  const device_id = searchParams.get('device_id')
  // const is_active = searchParams.get('is_active')
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/player/play`
  url += `?device_id=${device_id}`

  const res = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearer}`,
      'Content-Type': 'application/json'
    },
    cache: "no-cache",
    body: JSON.stringify(params)
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
  
  return NextResponse.json(res)
}