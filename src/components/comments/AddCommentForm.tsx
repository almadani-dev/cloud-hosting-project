"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddCommentForm = () => {
  const [text, setText] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") {
      return toast.error("Please enter a comment");
    }
    console.log({ text });
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
