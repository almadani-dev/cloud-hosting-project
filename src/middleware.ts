import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value as string;
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        { message: "no token , access denied, from middleware" },
        { status: 401 }
      );
    }
  } else {
    if (
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};
