import { NextRequest, NextResponse } from "next/server";
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'artist' // medium_term
  const limit = searchParams.get('limit') || 5
  const after = searchParams.get('after') || ''

  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/following`
  url += `?type=${type}&limit=${limit}`
  after ? url += `&after=${after}` : ''
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const res = await fetch(`${url}`, {
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
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { type, ids } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/following`
  url += `?type=${type}`
  url += `&ids=${ids}`

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
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { type, ids } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/following`
  url += `?type=${type}`
  url += `&ids=${ids}`

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