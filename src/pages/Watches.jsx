import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchCard from "../components/WatchCard";
import styles from "./Watches.module.css";

function Watches() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:4000/watches");
        if (!res.ok) throw new Error("Network response was not ok.");

        const data = await res.json();
        setWatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className={styles.state}>Loading...</p>;
  if (error) return <p className={styles.state}>Error: {error}</p>;

  return (
    <section className={styles.grid}>
      {watches.map((watch) => (
        <Link key={watch.id} to={watch.id}>
          <WatchCard watch={watch} />
        </Link>
      ))}
    </section>
  );
}

export default Watches;
