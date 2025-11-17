
import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  try {
    const { searchParams } = new URL(request.url)
    let url = process.env.NEXT_PUBLIC_API_DOMAIN
    const limit = searchParams.get('limit') || 5
    const response = await fetch(`${url}me/player/recently-played?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch recently played')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching recently played:', error)
    return NextResponse.json({ error: 'Failed to fetch recently played' }, { status: 500 })
  }
}
