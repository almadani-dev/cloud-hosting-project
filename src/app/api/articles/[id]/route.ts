import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dtos";
import prisma from "@/utils/db";
interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get Single article by id
 * @access Public
 */

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const id = parseInt((await params).id);
    const article = await prisma.article.findUnique({ where: { id: id } });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc Update Article
 * @access Public
 */

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const id = parseInt((await params).id);
    const article = await prisma.article.findUnique({ where: { id: id } });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    const body: UpdateArticleDto = await req.json();
    const updatedArticle = await prisma.article.update({
      where: { id: id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const id = parseInt((await params).id);
    const article = await prisma.article.findUnique({ where: { id: id } });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    await prisma.article.delete({ where: { id: id } });
    return NextResponse.json({ message: "Article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
