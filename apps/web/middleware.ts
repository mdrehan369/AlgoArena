import { protectedPaths } from '@utils/paths'
import { NextResponse, NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const cookie = request.cookies.get("better-auth.session_token")?.value
  if (path.startsWith("/login") && cookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const isLoggedIn = cookie
  const isProtected = protectedPaths.includes(path)

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  NextResponse.next()
}

