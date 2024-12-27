import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { LoginDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";

/**
 * @method POST
 * @route ~/api/users/login
 * @desc Login User
 * @access Public
 */

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginDto;

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) {
      return NextResponse.json(
        { message: "Please make an account" },
        { status: 400 }
      );
    }

    const matchedPassword = await bcrypt.compare(body.password, user.password);

    if (!matchedPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }

    // Create JWT Token
    const jwtPayload: JWTPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    // Set Cookie

    const cookie = setCookie(jwtPayload);
    return NextResponse.json(
      { message: "Login Successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
