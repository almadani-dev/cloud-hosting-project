"use client";

import { useState } from "react";
import { toast } from "react-toastify";
const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "" || description === "") {
      return toast.error("Please fill all the fields");
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
