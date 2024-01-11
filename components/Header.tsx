import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  return (
 <header className={styles.headerContainer}>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;