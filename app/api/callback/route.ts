
import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const { access_token, expires_in } = await SpotifyProvider.retriveAuthToken(code)

  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  const userId = await fetch(`${url}me`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
    .then(async (resp) => {
      if (resp && resp.status === 200) {
        const me = await resp.json()
        return me.id
      } else {
        return undefined
      }
    })
    .catch(() => {
      return undefined
    })
  const response = NextResponse.redirect(new URL('/', request.url), { status: 302 })
  cookieStore.set('me', userId)
  SpotifyProvider.storeToken({ cookies: cookieStore, token: access_token, expires_in })
  return response
}
