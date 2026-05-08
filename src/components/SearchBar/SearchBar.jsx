import styles from './SearchBar.module.css';

export default function SearchBar({ query, onSearch }) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className={styles.icon}>&#128269;</span>
    </div>
  );
}
