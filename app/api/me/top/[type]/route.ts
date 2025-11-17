import { NextRequest, NextResponse } from "next/server";
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }>}) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  // Over what time frame the affinities are computed.
  // Valid values: long_term (calculated from ~1 year of data and including all new data as it becomes available),
  // medium_term (approximately last 6 months),
  // short_term (approximately last 4 weeks). Default: medium_term
  const timeRange = searchParams.get('time_range') || 'medium_term' // medium_term
  const limit = searchParams.get('limit') || 4
  const offset = searchParams.get('offset') || 0
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const { type } = await params
  const res = await fetch(`${url}me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then((resp) => {
      return resp
    })


  return NextResponse.json(await res.json())
}