import { NextResponse } from 'next/server'

export async function POST(request) {
  const req = NextResponse.redirect(new URL('/login', request.url), { status: 302 })
  req.cookies.delete('accessToken')
  req.cookies.delete('me')
  return req
}