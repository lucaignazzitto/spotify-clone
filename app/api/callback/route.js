
import { NextResponse } from 'next/server'
import SpotifyProvider from "services/SpotifyProvider"

export async function GET(request, context) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const { access_token, expires_in } = await SpotifyProvider.retriveAuthToken(code)
  const response = NextResponse.redirect(new URL('/', request.url), { status: 302 })
  SpotifyProvider.storeToken({ request: response, token: access_token, expires_in })
  return response
}
