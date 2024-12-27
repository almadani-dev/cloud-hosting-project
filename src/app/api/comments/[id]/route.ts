import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/dtos";
interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get Single article by id
 * @access Public
 */

// export async function GET(req: NextRequest, { params }: Props) {
//   try {
//     const id = parseInt((await params).id);
//     const article = await prisma.article.findUnique({ where: { id: id } });

//     if (!article) {
//       return NextResponse.json(
//         { message: "Article not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(article);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal Server Error: " + error },
//       { status: 500 }
//     );
//   }
// }

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc Update Comments
 * @access private (only owner of the comment)
 */

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(req);

    const id = parseInt((await params).id);
    const comment = await prisma.comment.findUnique({ where: { id: id } });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    if (user === null || user?.id !== comment.userId) {
      return NextResponse.json(
        { message: "only owner the comment can update it " },
        { status: 403 }
      );
    }
    const body = (await req.json()) as UpdateCommentDto;

    const updatedComment = await prisma.comment.update({
      where: { id: id },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc DELETE Comments
 * @access private (only owner OR admin of the comment)
 */

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(req);

    const id = parseInt((await params).id);
    const comment = await prisma.comment.findUnique({ where: { id: id } });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    if (user === null) {
      return NextResponse.json(
        { message: "no token provided , access denied" },
        { status: 403 }
      );
    }

    if (user.isAdmin === true || user.id === comment.userId) {
      await prisma.comment.delete({ where: { id: id } });
      return NextResponse.json(
        { message: "comments deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "You are not allowed " },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
