import { NextRequest, NextResponse } from "next/server"
import { auth } from "./auth"

const AuthRoutes = ["/auth/signin", "/auth/signup"]
const ProtectedRoutes = ["/profile", "/compete", "/leaderboard", "/practice"]
const PublicRoutes = ["/"]
// const PublicRoutes = ["/"]

export async function middleware(req: NextRequest) {
    const session = await auth()
    const isAuthRoute = AuthRoutes.includes(req.nextUrl.pathname)
    const isProtectedRoute = ProtectedRoutes.includes(req.nextUrl.pathname)
    const isPublicRoute = PublicRoutes.includes(req.nextUrl.pathname)

    if(isPublicRoute) return NextResponse.next()
    if (isAuthRoute && session?.user)
        return NextResponse.redirect(new URL("/", req.url))
    if(isAuthRoute) return NextResponse.next()
    if(isProtectedRoute && session?.user) NextResponse.next()
    else return NextResponse.redirect(new URL("/auth/signin", req.url))

    return NextResponse.next()
}

export const config = {
    matcher: [
      "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ]
  }
