import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { id: albumnId } = await params
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const res = await fetch(`${url}playlists/${albumnId}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
  return NextResponse.json(await res.json())
}