import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/users/logout
 * @desc Logout User
 * @access Public
 */

export async function GET() {
  try {
    (await cookies()).delete("token");
    return NextResponse.json({ message: "Logout Successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
