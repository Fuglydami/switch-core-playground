'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './TopNav.module.css';
import { useTheme } from './ThemeProvider';

export function TopNav() {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      {/* Logo + version */}
      <div className={styles.logoArea}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoMark}>S</div>
          <span className={styles.logoName}>Switch Core</span>
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

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>

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

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
