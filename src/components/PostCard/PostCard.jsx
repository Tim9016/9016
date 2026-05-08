import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
  return (
    <article className={styles.card}>
      <Link to={`/post/${post.slug}`} className={styles.link}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <time className={styles.date}>{post.date}</time>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
