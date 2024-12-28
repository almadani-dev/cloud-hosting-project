import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { cookies } from "next/headers";
import { verifyTokenPages } from "@/utils/verifyToken";
interface SingleArticlePageProps {
  params: Promise<{ id: string }>;
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  const token = (await cookies()).get("token")?.value || "";
  const user = verifyTokenPages(token);

  const article: SingleArticle = await getSingleArticle((await params).id);

  return (
    <section className="fix-height container m-auto px-5 pt-8 md:w-3/4 ">
      <div className="bg-gray-200 p-7 rounded-lg mb-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">
          {article.title}
        </h1>
        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article.description}</p>
      </div>
      <div className="mt-7">
        {user ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="text-blue-600 md:text-xl">
            To write comment you should log in first
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default SingleArticlePage;
