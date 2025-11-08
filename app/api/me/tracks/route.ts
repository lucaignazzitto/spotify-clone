import { NextRequest, NextResponse } from "next/server";
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || 5
  const offset = searchParams.get('offset') || 0
  const market = searchParams.get('market') || 'IT'

  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/tracks`
  url += `?market=${market}`
  url += `&limit=${limit}`
  url += `&offset=${offset}`

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then((resp) => {
      return resp
    })
    

  return NextResponse.json(await res.json())
}

export async function PUT(request) {
  const { ids } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/tracks`
  url += `?ids=${ids}`

  const { value: bearer } = await SpotifyProvider.getToken(request)
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      ids: [ids]
    })
  })
  
  return NextResponse.json(res)
}

export async function DELETE(request) {
  const { ids } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/tracks`
  url += `?ids=${ids}`

  const { value: bearer } = await SpotifyProvider.getToken(request)
  const res = await fetch(`${url}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      ids: [ids]
    })
  })
    

  return NextResponse.json(res)
}