
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"

export async function GET(request: NextRequest) {
  const { status, value: bearer } = await SpotifyProvider.getToken(request)

  if (status !== 200) {
    return NextResponse.json({}, { status })
  }

  const cookieStore = await cookies()
  // check for beare
  // check for user instance on cookie
  const user = cookieStore.get('me')
  if (user && user.value) {
    // return it
    return NextResponse.json({ me: JSON.parse(user.value) }, { status: 200 })
  }

  // no user inside cookie
  // load it
  const url = process.env.NEXT_PUBLIC_API_DOMAIN
  return await fetch(`${url}me`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
    .then(async (resp) => {
      if (resp && resp.status === 200) {
        const me = await resp.json()
        return NextResponse.json({ me }, {
          status: 200,
          headers: { 'Set-Cookie': `me=${JSON.stringify(me)}` },
        })
      } else {
        return NextResponse.json({}, { status: 404 })
      }
    })
    .catch((err) => {
      return NextResponse.json({ err }, { status: 500 })
    }) 
}