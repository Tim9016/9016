import styles from './TagList.module.css';

export default function TagList({ title, items, selected, onSelect }) {
  if (!items.length) return null;

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.heading}>{title}</h4>
      <div className={styles.list}>
        {items.map((item) => (
          <button
            key={item}
            className={`${styles.item} ${selected === item ? styles.selected : ''}`}
            onClick={() => onSelect(selected === item ? null : item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
