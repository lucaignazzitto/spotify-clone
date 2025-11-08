import { NextRequest, NextResponse } from "next/server";
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  const { id: artistId} = await params
  const market = searchParams.get('market')
  const limit = searchParams.get('limit') || 5
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const res = await fetch(`${url}artists/${artistId}/albums?market=${market}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then((resp) => {
      return resp
    })

  return NextResponse.json(await res.json())
}