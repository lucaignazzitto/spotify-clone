import { NextResponse } from 'next/server'
import SpotifyProvider from "services/SpotifyProvider"

export async function POST(request, context) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const playlist_id = context.params.id
  const { tracks = [], position = 0 } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `playlists/${playlist_id}/tracks`

  const res = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      uris: tracks,
      position
    })
  })
  
  return NextResponse.json(res)
}


export async function DELETE(request, context) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const playlist_id = context.params.id
  const { tracks = [] } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `playlists/${playlist_id}/tracks`

  const res = await fetch(`${url}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      tracks: tracks.map((trackUri) => {
        return {
          uri: trackUri
        }
      })
    })
  })
  
  return NextResponse.json(res)
}