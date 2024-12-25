"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}
const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="fix-height pt-7 text-center">
      <div className="text-3xl text-red-600 font-semibold">
        Something went wrong
      </div>
      <h2 className="text-gray-700 mt-4 text-xl">
        Error Message: {error.message}
      </h2>
      <button
        onClick={reset}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      >
        Try again
      </button>
      <Link className="text-xl underline text-blue-700 block mt-6" href="/">
        Go to home page
      </Link>
    </div>
  );
};

export default ErrorPage;
