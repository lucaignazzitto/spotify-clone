import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"
import { AlbumInterface } from '@/lib/models/album.inteface'

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)

  const offset = searchParams.get('offset') || 0
  const limit = searchParams.get('limit') || 30

  let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}browse/new-releases`
  url += `?offset=${offset}`
  url += `&limit=${limit}`

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then(async (resp) => await resp.json() as AlbumInterface[])

  return NextResponse.json(res)
}