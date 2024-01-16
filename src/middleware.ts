import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import NextAuth from "next-auth/next";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    var currentPath = req.nextUrl.pathname;
    console.log('req', currentPath);

    if(currentPath.startsWith('/login')) return NextResponse.redirect('/');
  },
  {
    pages: {
      signIn: "/login",
    }
  }
);

// export const config = { matcher: ["/login"] }
