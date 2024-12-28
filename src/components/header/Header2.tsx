import { navButtons } from "@/utils/constants";
import Link from "next/link";
import module from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenPages } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";
const Header2 = async () => {
  const token = (await cookies()).get("token")?.value;

  const user = verifyTokenPages(token || "");

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Navbar />
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <strong className="text-blue-800 md:text-xl capitalize">
              {user?.username}
            </strong>
            <LogoutButton />
          </>
        ) : (
          <>
            {navButtons.map((item, index) => (
              <Link key={index} href={item.href} className={module.btn}>
                {item.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </header>
  );
};
export default Header2;
