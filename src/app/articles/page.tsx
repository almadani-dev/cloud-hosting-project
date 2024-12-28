import ArticleItem from "@/components/articles/ArticleItem";
import { Metadata } from "next";
import SearchArticleInput from "./SearchArticleInput";
import Pagination from "./Pagination";
import { Article } from "@prisma/client";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import { ItemPerPage } from "@/utils/constants";

interface ArticlesPageProps {
  searchParams: Promise<{ page: string }>;
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const { page } = await searchParams;
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ItemPerPage);
  const articles: Article[] = await getArticles(page);

  return (
    <section className=" fix-height container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      <Pagination pageNumber={parseInt(page)} route="/articles" pages={pages} />
    </section>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles page for displaying articles.",
};
