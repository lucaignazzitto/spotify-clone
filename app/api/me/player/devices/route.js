import { NextResponse } from 'next/server'
import SpotifyProvider from "services/SpotifyProvider"

export async function GET(request, context) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  let url = process.env.NEXT_PUBLIC_API_DOMAIN

  const res = await fetch(`${url}me/player/devices`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    cache: 'no-store'
  })
    .then(async (resp) => {
      if (resp.status === 200) {
        return await resp.json()
      } else {
        return {}
      }
    })
  
  return NextResponse.json(res)
}