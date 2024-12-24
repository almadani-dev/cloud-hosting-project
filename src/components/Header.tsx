import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import Navbar from "./Navbar";
const Header = () => {
  return (
    <header className="h-[70px] flex items-center justify-between px-[40px] border-b-[4px] border-solid border-[#909090] bg-[#e3e1e1] relative">
      <Navbar />

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="cursor-pointer bg-blue-500 text-white rounded-[10px] py-[5px] px-[10px] text-[17px] font-[600] flex items-center hover:bg-[#00008B]"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="cursor-pointer bg-blue-500 text-white rounded-[10px] py-[5px] px-[10px] text-[17px] font-[600] flex items-center hover:bg-[#00008B]"
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
