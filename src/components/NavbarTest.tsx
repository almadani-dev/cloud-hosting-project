"use client";
import Link from "next/link";
import { useState } from "react";
import { GrTechnology } from "react-icons/gr";

const NavbarTest = () => {
  return (
    <nav className="flex items-center justify-between">
      <div>
        <Link
          href="/"
          className="flex items-center text-[20px] font-bold text-[#b00fb0]"
        >
          Cloud
          <GrTechnology />
          Hosting
        </Link>
      </div>

      <div className="hidden md:flex">
        <ul className="ml-[30px] ">
          <Link
            href="/"
            className="font-bold mx-3 text-base hover:text-blue-700"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="font-bold mx-3 text-base hover:text-blue-700"
          >
            About
          </Link>
          <Link
            href="/articles"
            className="font-bold mx-3 text-base hover:text-blue-700"
          >
            Articles
          </Link>
          <Link
            href="/admin"
            className="font-bold mx-3 text-base hover:text-blue-700"
          >
            Admin Panel
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarTest;
