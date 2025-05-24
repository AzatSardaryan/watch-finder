import styles from "./WatchCard.module.css";
export default function WatchCard({ watch }) {
  const { brand, model, price, image } = watch;

  return (
    <article className={styles.card}>
      <img src={image} />
      <h3 className={styles.title}>
        {brand} <span>{model}</span>
      </h3>
      <p className={styles.price}>£{price.toLocaleString()}</p>
    </article>
  );
}
