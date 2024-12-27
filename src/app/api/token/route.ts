import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  try {
    const user = verifyToken(req);
    return NextResponse.json({
      data: {
        username: user?.username,
        email: user?.email,
      },
    });
  } catch {
    return null;
  }
}
