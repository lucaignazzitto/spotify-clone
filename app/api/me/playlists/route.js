import { NextResponse } from "next/server";
import SpotifyProvider from "services/SpotifyProvider"

export async function GET(request) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || 5
  const offset = searchParams.get('offset') || 0

  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/playlists`
  url += `?limit=${limit}&offset=${offset}`
  
  const res = await fetch(`${url}`, {
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
              spotify: res.items.filter((p) => p.owner.id === 'spotify'),
              user: res.items.filter((p) => p.owner.id !== 'spotify')
            }
          }
        })
    })
    

  return NextResponse.json(res)
}