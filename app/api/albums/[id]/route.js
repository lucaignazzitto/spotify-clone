import { NextResponse } from 'next/server'
import SpotifyProvider from "services/SpotifyProvider"

export async function GET(request, context) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const albumnId = context.params.id
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const res = await fetch(`${url}albums/${albumnId}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
  return NextResponse.json(await res.json())
}
