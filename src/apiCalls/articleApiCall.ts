import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

export async function getArticles(
  page: string | undefined
): Promise<Article[]> {
  const data = await fetch(`${DOMAIN}/api/articles?page=${page}`, {
    next: { revalidate: 50 },
  });
  if (!data.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return data.json();
}

export async function getArticlesCount(): Promise<number> {
  const data = await fetch(`${DOMAIN}/api/articles/count`, {
    next: { revalidate: 50 },
  });
  if (!data.ok) {
    throw new Error("Failed To Fetch Articles Count");
  }
  const { count } = (await data.json()) as { count: number };
  return count;
}

export async function getArticlesSearch(
  searchText: string
): Promise<Article[]> {
  const data = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`,
    {
      next: { revalidate: 50 },
    }
  );
  if (!data.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return data.json();
}

export async function getSingleArticle(
  articleId: string
): Promise<SingleArticle> {
  const data = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!data.ok) {
    throw new Error("An error occurred while fetching One Article");
  }

  return data.json();
}
