import Link from "next/link";
import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.heroSection}>
      <div className={styles.glowBlob}></div>
      <div className={`container animate-fade-in ${styles.heroContent}`}>
        <h1 className={styles.title}>
          Capture your thoughts with <span className={styles.highlight}>Aura</span>
        </h1>
        <p className={styles.subtitle}>
          The premium, secure, and lightning-fast full-stack notes app to organize your life. Experience the next level of note taking.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/register" className={`btn-primary ${styles.heroBtn}`}>Start for Free</Link>
          <Link href="/login" className={`btn-secondary ${styles.heroBtn}`}>Sign In to Account</Link>
        </div>
      </div>

      <div className={`container animate-fade-in ${styles.featureGrid}`}>
        <div className="glass-panel">
          <div className={styles.featureIcon}>⚡</div>
          <h3>Lightning Fast</h3>
          <p>Powered by Next.js edge architecture for instantaneous load times.</p>
        </div>
        <div className="glass-panel">
          <div className={styles.featureIcon}>🔒</div>
          <h3>Secure By Design</h3>
          <p>Your notes are fully encrypted with state-of-the-art bcrypt security.</p>
        </div>
        <div className="glass-panel">
          <div className={styles.featureIcon}>✨</div>
          <h3>Premium UI/UX</h3>
          <p>Crafted thoughtfully with engaging micro-animations and aesthetic layout.</p>
        </div>
      </div>
    </div>
  );
}
