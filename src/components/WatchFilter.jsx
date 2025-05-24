import { useSearchParams } from "react-router-dom";
import styles from "./WatchFilter.module.css";
import { useState, useEffect, useCallback } from "react";

export default function WatchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");

  const updateSearchParam = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(searchParams);

      if (value) newParams.set(key, value);
      else newParams.delete(key);

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      updateSearchParam("q", searchInput);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchInput, updateSearchParam]);

  const brand = searchParams.get("brand") || "";

  function handleBrandChange(e) {
    updateSearchParam("brand", e.target.value);
  }

  return (
    <div className={styles.filters}>
      <label>
        Brand:{" "}
        <select value={brand} onChange={handleBrandChange}>
          <option value="">All</option>
          <option value="Rolex">Rolex</option>
          <option value="Omega">Omega</option>
          <option value="Casio">Casio</option>
        </select>
      </label>

      <input
        type="text"
        placeholder="Search model..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
