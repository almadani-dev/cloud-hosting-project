import AddArticleForm from "./AddArticleForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenPages } from "@/utils/verifyToken";
const AdminPage = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/");
  const user = verifyTokenPages(token);
  if (user?.isAdmin === false) redirect("/" );
  return (
    <div className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticleForm />
      </div>
    </div>
  );
};

export default AdminPage;
