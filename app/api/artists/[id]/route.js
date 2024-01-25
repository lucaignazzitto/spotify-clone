import { NextResponse } from 'next/server'
import SpotifyProvider from "services/SpotifyProvider"

export async function GET(request, context) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const artistId = context.params.id
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const res = await fetch(`${url}artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then((resp) => {
      return resp
    })
  const artist = await res.json()
  return NextResponse.json({ artist })
}