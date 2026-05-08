import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import profile from '../../data/profile';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          {profile.blogName}
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="切换菜单"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setMenuOpen(false)}
          >
            首页
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setMenuOpen(false)}
          >
            写文章
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setMenuOpen(false)}
          >
            关于
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
