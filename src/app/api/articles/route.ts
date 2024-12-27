import { ItemPerPage } from "@/utils/constants";
import prisma from "@/utils/db";
import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles
 * @desc Get articles by page number
 * @access Public
 */
export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";

    const articles = await prisma.article.findMany({
      skip: ItemPerPage * (parseInt(page) - 1),
      take: ItemPerPage,
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Create new Article
 * @access private (only admin can create article)
 */

export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (user === null || user?.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }

    const body = (await req.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
