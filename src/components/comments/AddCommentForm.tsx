"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") {
      return toast.error("Please enter a comment");
    }

    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input
          className="rounded-lg text-xl w-full bg-white focus:shadow-md p-2"
          type="text"
          placeholder="Add Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
