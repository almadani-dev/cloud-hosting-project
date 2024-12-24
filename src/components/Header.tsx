"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrTechnology } from "react-icons/gr";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items array
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Articles", href: "/articles" },
    { name: "Admin Dashboard", href: "/admin" },
  ];

  const navButtons = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  return (
    <div>
      <nav className="block w-full max-w-screen px-8 py-4 mx-auto bg-[#e3e1e1] border-b-[4px] border-solid border-[#909090] bg-opacity-90 sticky top-3 shadow lg:px-8 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          <Link
            href="/"
            className="flex items-center text-[20px] font-bold text-[#b00fb0]"
          >
            Cloud
            <GrTechnology />
            Hosting
          </Link>

          <div className="lg:hidden">
            <div
              className="cursor-pointer relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-3xl font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={toggleMobileMenu}
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
                <AiOutlineMenu />
              </span>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden z-50`}
          >
            <div className="flex flex-row items-center border-b pb-4">
              <Link
                href="/"
                className="mt-4 ml-4 flex items-center text-[20px] font-bold text-[#b00fb0]"
              >
                Cloud
                <GrTechnology />
                Hosting
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 text-slate-600 hover:text-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col h-full gap-4 p-4">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-blue-500"
                >
                  <Link
                    href={item.href}
                    className="flex items-center"
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {navButtons.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <Link
                    onClick={toggleMobileMenu}
                    href={item.href}
                    className="bg-blue-500 hover:bg-[#00008B] text-white px-8 py-2 rounded-md"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block items-center justify-center">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-blue-500"
                >
                  <Link href={item.href} className="flex items-center">
                    {item.name}
                  </Link>
                </li>
              ))}
              {navButtons.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    href={item.href}
                    className="bg-blue-500 hover:bg-[#00008B] text-white px-5 py-2 rounded-md"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
