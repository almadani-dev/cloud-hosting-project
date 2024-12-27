import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value as string;
  if (!token) {
    return NextResponse.json(
      { message: "no token , access denied, from middleware" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*"],
};
