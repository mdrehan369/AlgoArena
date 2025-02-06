import { NextRequest, NextResponse } from "next/server"
import { auth } from "./auth"

export async function middleware(req: NextRequest) {
    const session = await auth()
    // console.log(session?.user)
    if (!session?.user)
        return NextResponse.redirect(new URL("/auth/signin", req.url))
    else NextResponse.next()
}

export const config = {
    matcher: ["/compete", "/practice", "/leaderboard"]
}
