import { NextResponse } from 'next/server'
import SpotifyProvider from "@/services/SpotifyProvider"
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const { status } = await SpotifyProvider.getToken(request)

  if (status === 401) {
    return NextResponse.redirect(new URL('/login', request.url))
  } else {
    return NextResponse.next()
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|manifest.json|icons/*|splash_screens/*|favicon.ico|login|service-worker.js).*)',
}