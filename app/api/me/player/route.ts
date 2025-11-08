import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const { searchParams } = new URL(request.url)
  const market = searchParams.get('market')
  const { value: bearer } = await SpotifyProvider.getToken(request)
  const player = await fetch(`${url}me/player?market=${market}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then(async (resp) => {
      if (resp.status === 200) {
        return await resp.json()
      } else {
        return {}
      }
    })
  
  return NextResponse.json({ player })
}

export async function PUT(request) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { device_id, play = false } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN

  const res = await fetch(`${url}me/player`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    cache: 'no-store',
    body: JSON.stringify({
      device_ids: [device_id],
      play
    })
  })
    .then((res) => {
      return res
    })
  
  return NextResponse.json(res)
}