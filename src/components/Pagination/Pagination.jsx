import styles from './Pagination.module.css';

export default function Pagination({ current, total, onPage }) {
  if (total <= 1) return null;

  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.wrapper}>
      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.btn} ${p === current ? styles.active : ''}`}
          onClick={() => onPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
