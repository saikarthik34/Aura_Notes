"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.brand}>
          <div className={styles.logoMark}></div>
          Aura Notes
        </Link>
        <div className={styles.navLinks}>
          {status === "loading" ? (
            <div className={styles.skeleton}></div>
          ) : session ? (
            <>
              <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.navLink}>Login</Link>
              <Link href="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
