import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const queue = await fetch(`${url}me/player/queue`, {
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
  
  return NextResponse.json({ playerQueue: queue || {} })
}

export async function POST(request) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { device_id, uri = '' } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/player/queue`
  url += `?device_id=${device_id}`
  url += `&uri=${uri}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      device_id,
      uri
    })
  })
  
  return NextResponse.json(response)
}