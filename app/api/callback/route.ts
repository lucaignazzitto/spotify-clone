
import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const { access_token, expires_in } = await SpotifyProvider.retriveAuthToken(code)
  const response = NextResponse.redirect(new URL('/', request.url), { status: 302 })
  SpotifyProvider.storeToken({ cookies: cookieStore, token: access_token, expires_in })
  return response
}
