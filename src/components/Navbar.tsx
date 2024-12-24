import Link from "next/link";
import { GrTechnology } from "react-icons/gr";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <div>
        <Link
          href="/"
          className="flex items-center text-[24px] font-bold text-[#b00fb0]"
        >
          Cloud
          <GrTechnology />
          Hosting
        </Link>
      </div>

      <ul className="ml-[30px]">
        <Link href="/" className="font-bold mx-3 text-lg hover:text-blue-700">
          Home
        </Link>
        <Link
          href="/about"
          className="font-bold mx-3 text-lg hover:text-blue-700"
        >
          About
        </Link>
        <Link
          href="/articles"
          className="font-bold mx-3 text-lg hover:text-blue-700"
        >
          Articles
        </Link>
        <Link
          href="/admin"
          className="font-bold mx-3 text-lg hover:text-blue-700"
        >
          Admin Dashboard
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;



