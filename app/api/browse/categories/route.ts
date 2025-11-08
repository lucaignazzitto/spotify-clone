import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)

  const country = searchParams.get('country') || 'IT'
  const locale = searchParams.get('locale') || 'IT_it'
  const offset = searchParams.get('offset') || 0
  const limit = searchParams.get('limit') || 10

  let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}browse/categories`
  url += `?country=${country}`
  url += `&locale=${locale}`
  url += `&offset=${offset}`
  url += `&limit=${limit}`

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then(async (resp) => await resp.json())

  return NextResponse.json(res)
}