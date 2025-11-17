
import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  // no user inside cookie
  // load it
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  return fetch(`${url}me`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then(async (resp) => {
      if (resp && resp.status === 200) {
        const me = await resp.json()
        const response = NextResponse.json({ me }, { status: 200 })
        return response
      } else {
        return NextResponse.json({}, { status: 404 })
      }
    })
    .catch((err) => {
      return NextResponse.json({ err }, { status: 500 })
    })
}