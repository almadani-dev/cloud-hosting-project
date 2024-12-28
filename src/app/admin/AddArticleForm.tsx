"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "" || description === "") {
      return toast.error("Please fill all the fields");
    }

    try {
      await axios.post(`${DOMAIN}/api/articles/`, {
        title: title,
        description: description,
      });
      router.refresh();
      setTitle("");
      setDescription("");
      toast.success("Add New Comment Successfully");
      router.push("/admin/articles-table?page=1");
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
      <form onSubmit={formSubmitHandler} className="flex flex-col">
        <input
          className="mb-4 border rounded p-2 text-xl"
          type="text"
          placeholder="Enter Article Title "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="mb-4 border rounded p-2 text-xl"
          rows={5}
          placeholder="Enter Article Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddArticleForm;
