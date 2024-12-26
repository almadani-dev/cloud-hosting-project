import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { RegisterDto } from "@/utils/dtos";
import { registerSchmea } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { JWTPayload } from "@/utils/types";
import { generateJWT } from "@/utils/generateToken";

/**
 * @method POST
 * @route ~/api/users/register
 * @desc Create new User [(Register)]
 * @access Public
 */

export async function POST(req: NextRequest) {
  try {
    const body: RegisterDto = await req.json();

    const validation = registerSchmea.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }


    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    // Create JWT Token
    const jwtPayload: JWTPayload = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    };
    const token = generateJWT(jwtPayload);

    return NextResponse.json({ newUser, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
