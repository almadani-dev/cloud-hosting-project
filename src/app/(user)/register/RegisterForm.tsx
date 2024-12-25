"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "" || username === "") {
      return toast.error("Please fill all the fields");
    }
    console.log({ email, password, username });
  };
  return (
    <div>
      <form onSubmit={formSubmitHandler} className="flex flex-col">
        <input
          className="mb-4 border rounded p-2 text-xl"
          type="text"
          placeholder="Enter Your Username "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="mb-4 border rounded p-2 text-xl"
          type="email"
          placeholder="Enter Your Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 border rounded p-2 text-xl"
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
