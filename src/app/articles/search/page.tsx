import { getArticlesSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";

interface SearchArticlePageProps {
  searchParams: Promise<{ searchText: string }>;
}
const SearchArticlePage = async ({ searchParams }: SearchArticlePageProps) => {
  const text = (await searchParams).searchText;
  const articles: Article[] = await getArticlesSearch(text);
  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <div className="flex justify-center items-center">
          <h2 className=" text-gray-800 text-2xl font-bold p-5">
            Articles base on
            <span className="text-red-500 mx-3">{text}</span>
            not found
          </h2>
        </div>
      ) : (
        <div>
          <h1 className=" flex items-center justify-center text-2xl font-bold my-7 text-gray-800">
            Articles based on{" "}
            <span className="ms-1 text-green-700 text-3xl font-bold">
              {" "}
              {text}
            </span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((item) => (
              <ArticleItem key={item.id} article={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchArticlePage;
