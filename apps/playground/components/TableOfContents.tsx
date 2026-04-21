'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

interface Heading { id: string; text: string; level: number }

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('article h2, article h3'));
    const parsed: Heading[] = els.map((el) => ({
      id: el.id || slugify(el.textContent ?? ''),
      text: el.textContent ?? '',
      level: Number(el.tagName[1]),
    }));
    els.forEach((el, i) => {
      if (!el.id) el.id = parsed[i].id;
    });
    setHeadings(parsed);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className={styles.toc} aria-label="On this page">
      <p className={styles.title}>On this page</p>
      <ul className={styles.list}>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={[
                styles.link,
                h.level === 3 ? styles.linkH3 : '',
                activeId === h.id ? styles.linkActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.divider}>
        <button
          type="button"
          className={styles.backTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 9V3M6 3L3 6M6 3l3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to top
        </button>
      </div>
    </aside>
  );
}
