import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>Find Your Next Watch</h1>

      <p className={styles.tagline}>
        Browse and curate the timepieces that define you – from vintage icons to
        modern micro-brands.
      </p>

      <NavLink to="/app" className={styles.cta}>
        Enter App
      </NavLink>
    </header>
  );
}
