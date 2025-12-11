import { NextRequest, NextResponse } from "next/server";
import SpotifyProvider from "@/services/SpotifyProvider"
import { cookies } from "next/headers";
import { CreatePlaylistInterface, PlaylistInterface } from "@/lib/models/playlist.interface";

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || 10
  const offset = searchParams.get('offset') || 0
  const userId = searchParams.get('user_id') || (await cookies()).get('me')?.value

  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/playlists`
  url += `?limit=${limit}&offset=${offset}`

  const response = await fetch(`${url}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then((resp) => {
      return resp.json()
        .then((res) => {
          return {
            ...res,
            items: {
              user: userId ? res.items.filter((p) => p.owner.id === userId) : res.items,
              spotify: userId ? res.items.filter((p) => p.owner.id !== userId) : res.items
            }
          }
        })
    })


  return NextResponse.json(response)
}

export async function POST(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)
  const userId = (await cookies()).get('me')?.value

  if (status !== 200 && !userId) {
    return NextResponse.json({}, { status })
  }


  const { name, description, public: publicPlaylist } = await request.json() as CreatePlaylistInterface
  let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}users/${userId}/playlists`

  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      name,
      description,
      public: publicPlaylist
    })
  })
    .then((resp) => {
      return resp.json()
        .then((res) => {
          return res as PlaylistInterface
        })
    })


  return NextResponse.json(response)
}