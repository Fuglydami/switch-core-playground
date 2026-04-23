'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './TopNav.module.css';

export function TopNav() {
  const [query, setQuery] = useState('');

  return (
    <header className={styles.header}>
      {/* Logo + version */}
      <div className={styles.logoArea}>
        <Link href="/" className={styles.logoLink}>
          <img src="/interswitch-logo.png" alt="Interswitch" height={24} />
        </Link>
        <div className={styles.versionBadge}>
          v1.0.0
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <label className={styles.searchLabel}>
          <SearchIcon />
          <input
            type="search"
            placeholder="Search documentation"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </label>
      </div>

      {/* Right nav */}
      <nav className={styles.rightNav}>
        <Link href="/guidelines/platforms" className={styles.navLink}>Platforms</Link>
        <Link href="/guidelines/accessibility" className={styles.navLink}>Accessibility</Link>
        <Link href="/changelog" className={styles.navLink}>Changelog</Link>

        <div className={styles.avatar} aria-hidden="true">SC</div>
      </nav>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 10.5l2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

