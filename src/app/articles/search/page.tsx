interface SearchArticlePageProps {
  searchParams: Promise<{ searchText: string }>;
}
const SearchArticlePage = async ({ searchParams }: SearchArticlePageProps) => {
  const text = (await searchParams).searchText;
  return (
    <section className="fix-height container m-auto px-5">
      <h1 className="text-2xl font-bold">Search Text is {text}</h1>
    </section>
  );
};

export default SearchArticlePage;
