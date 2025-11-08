import { NextRequest, NextResponse } from "next/server";
import SpotifyProvider from "@/services/SpotifyProvider"

/**
 * Check to see if the current user
 * is following one or more artists or other Spotify users.
 * @param {*} request
 * @returns {Array} Array of booleans [false,true]
 */
export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'artist' // artist or user
  const ids = searchParams.get('ids')

  let url = process.env.NEXT_PUBLIC_API_DOMAIN
  url += `me/following/contains`
  url += `?type=${type}`
  url += `&ids=${encodeURIComponent(ids)}`
  
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