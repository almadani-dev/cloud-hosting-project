import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 * @method GET
 * @route ~/api/articles/count
 * @desc Get Articles Count
 * @access Public
 */

export async function GET() {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
