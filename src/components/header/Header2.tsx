import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenPages } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";

const Header2 = async () => {
  const token = (await cookies()).get("token")?.value || "";
  const user = verifyTokenPages(token);

  return (
    <header className={styles.header}>
      <Navbar isAdmin={user?.isAdmin || false} />
      <div className={styles.right}>
        {user ? (
          <>
            <Link
              href="/profile"
              className="text-blue-800 font-bold md:text-xl capitalize"
            >
              {user?.username}
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href="/login">
              Login
            </Link>
            <Link className={styles.btn} href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header2;
