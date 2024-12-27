import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchemas";
import { Comment } from "@prisma/client";

/**
 * @method GET
 * @route ~/api/comments
 * @desc Get all comments
 * @access private (only admin can get all comments)
 */
export async function GET(req: NextRequest) {
  try {
    const user = verifyToken(req);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/comments
 * @desc Create comment
 * @access private (only login user)
 */

export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 }
      );
    }

    const body = (await req.json()) as CreateCommentDto;
    const validation = createCommentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const newComment: Comment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
