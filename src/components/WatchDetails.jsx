import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./WatchDetails.module.css";

export default function WatchDetails() {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`http://localhost:4000/watches/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setWatch(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!watch) return <p>Watch not found</p>;

  return (
    <section className={styles.wrapper}>
      <div className={styles.imgBox}>
        <img
          src={watch.image}
          alt={`${watch.brand} ${watch.model}`}
          className={styles.img}
        />
      </div>

      <div className={styles.info}>
        <h2>
          {watch.brand} {watch.model}
        </h2>
        <p className={styles.price}>£{watch.price.toLocaleString()}</p>
        <p className={styles.desc}>{watch.description}</p>
      </div>
    </section>
  );
}
