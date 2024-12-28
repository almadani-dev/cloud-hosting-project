"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import ButtonSpinner from "@/components/header/ButtonSpinner";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "" || username === "") {
      return toast.error("Please fill all the fields");
    }

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, {
        username,
        email,
        password,
      });
      router.replace("/");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    }
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
          disabled={loading}
          className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg"
          type="submit"
        >
          {loading ? <ButtonSpinner /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
