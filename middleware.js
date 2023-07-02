import { NextRequest, NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth)

    // if req.nextUrl.pathname === "/profile"
  },
  {
    callbacks: {
        authorized: ({ req, token }) => {
            if (token) return true;
        }
    },
  }
)

// Default NextJS Middleware
// export function middleware(request) {
//     return NextResponse.redirect(new URL('/', request.url))
// }

export const config = {
    matcher: ['/profile', '/create-prompt', '/update-prompt/:path*'],
  }

// export { default } from "next-auth/middleware";