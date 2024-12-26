import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { LoginDto } from "@/utils/dtos";
import { loginSchmea } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";
/**
 * @method POST
 * @route ~/api/users/login
 * @desc Login User
 * @access Public
 */

export async function POST(req: NextRequest) {
  try {
    const body: LoginDto = await req.json();

    const validation = loginSchmea.safeParse(body);

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
    const token = generateJWT(jwtPayload);


    return NextResponse.json(
      { message: "Login Successfully", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
