"use client";
import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { DOMAIN } from "@/utils/constants";

interface UpdateArticleModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  articleId: number;
}

const UpdateArticleModal = ({
  setOpen,
  title,
  description,
  articleId,
}: UpdateArticleModalProps) => {
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescription] = useState(description);
  const router = useRouter();

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (updateTitle === "" || updateDescription === "")
      return toast.info("Please write something");

    try {
      await axios.put(`${DOMAIN}/api/articles/${articleId}`, {
        text: updateTitle,
      });
      router.refresh();
      setUpdateTitle("");
      setUpdateDescription("");
      toast.success("Updated Successfully");
      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-3xl"
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Title..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <textarea
            placeholder="Edit Description..."
            rows={5}
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition"
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticleModal;
