import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method Get
 * @route ~/api/users/profile/:id
 * @desc Delete Profile
 * @access private (only user himself can get his account)
 */

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const userFromToken = verifyToken(req);
    const id = parseInt((await params).id);
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "only user himself can delete his profile,forbidden" },
        { status: 403 } //forbidden
      );
    }

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update Profile
 * @access private (only user himself can update his account)
 */

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const userFromToken = verifyToken(req);
    const id = parseInt((await params).id);
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "only user himself can update his profile,forbidden" },
        { status: 403 } //forbidden
      );
    }

    const body = (await req.json()) as UpdateUserDto;

    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json(
          { message: "password should be minium 6 characters" },
          { status: 400 }
        );
      }
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete Profile
 * @access private (only user himself can delete his account)
 */

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const userFromToken = verifyToken(req);
    const id = parseInt((await params).id);
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (userFromToken !== null && userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "only user himself can delete his profile,forbidden" },
        { status: 403 } //forbidden
      );
    }

    await prisma.user.delete({ where: { id: id } });
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
