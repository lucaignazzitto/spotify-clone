
import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  const q = searchParams.get('keyword') || ''
  const limit = searchParams.get('limit') || 4
  const offset = searchParams.get('offset') || 0
  const type = searchParams.get('type') || encodeURIComponent("track,artist,album")
  const url = process.env.NEXT_PUBLIC_API_DOMAIN

  const res = await fetch(`${url}search?q=${q}&limit=${limit}&offset=${offset}&type=${type}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then((resp) => {
      return resp
    })
  
  const results = await res.json()
  return NextResponse.json({ results })
}