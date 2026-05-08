import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} 我的博客 — Built with React + Vite</p>
    </footer>
  );
}
