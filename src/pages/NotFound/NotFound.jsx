import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1>404</h1>
      <p>页面未找到</p>
      <Link to="/" className={styles.link}>
        返回首页
      </Link>
    </div>
  );
}
