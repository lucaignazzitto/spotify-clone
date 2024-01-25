import { NextResponse } from 'next/server'
import SpotifyProvider from "services/SpotifyProvider"

export async function PUT(request) {
  const { ids } = await request.json()
  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/album`
  url += `?ids=${ids}`

  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const res = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${bearer}`
    },
    body: JSON.stringify({
      ids
    })
  })
  
  return NextResponse.json(res)
}