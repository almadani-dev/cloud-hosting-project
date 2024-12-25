import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@/utils/types";
import { Metadata } from "next";
import SearchArticleInput from "./SearchArticleInput";
import Pagination from "./Pagination";

const ArticlesPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 50 },
  });
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  const articles: Article[] = await response.json();
  return (
    <section className=" fix-height container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles page for displaying articles.",
};
