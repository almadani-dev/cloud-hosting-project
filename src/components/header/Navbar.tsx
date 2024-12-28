"use client";
import Link from "next/link";
import React, { useState } from "react";
import { navItems } from "@/utils/constants";
import { GrTechnology } from "react-icons/gr";
import module from "./header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={module.navbar}>
      <Link href="/" className={module.logo}>
        Cloud
        <GrTechnology />
        Hosting
      </Link>

      <div className={module.menu}>
        {toggle ? (
          <IoMdClose onClick={() => setToggle((prev) => !prev)} />
        ) : (
          <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
        )}
      </div>

      <div
        className={module.navLinksWrapper}
        style={{
          clipPath:
            (toggle && "polygon(0 0 , 100% 0 , 100% 100% , 0 100%") || "",
        }}
      >
        <ul className={module.navLinks}>
          {navItems.map((item, index) => (
            <Link
              onClick={() => setToggle(false)}
              href={item.href}
              key={index}
              className={module.navLink}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
