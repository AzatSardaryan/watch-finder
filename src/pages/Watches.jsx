import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchCard from "../components/WatchCard";
import styles from "./Watches.module.css";
import WatchFilter from "../components/WatchFilter.jsx";
import { useSearchParams } from "react-router-dom";

function Watches() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

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

  const brand = searchParams.get("brand");
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredWatches = watches.filter((watch) => {
    const matchBrand = brand
      ? watch.brand.toLowerCase() === brand.toLowerCase()
      : true;

    const matchQuery = watch.model.toLowerCase().includes(query);

    return matchBrand && matchQuery;
  });

  return (
    <>
      <WatchFilter />

      {filteredWatches.length === 0 ? (
        <p className={styles.state}>No watches found for your filters.</p>
      ) : (
        <section className={styles.grid}>
          {filteredWatches.map((watch) => (
            <Link key={watch.id} to={watch.id}>
              <WatchCard watch={watch} />
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

export default Watches;
