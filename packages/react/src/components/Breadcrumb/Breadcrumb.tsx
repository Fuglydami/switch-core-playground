import React from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  onNavigate?: (item: BreadcrumbItem) => void;
  className?: string;
}

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  maxItems,
  onNavigate,
  className = '',
}) => {
  const handleClick = (item: BreadcrumbItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
    onNavigate?.(item);
  };

  const renderItems = () => {
    let displayItems = items;
    let showEllipsis = false;

    if (maxItems && items.length > maxItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 1));
      displayItems = [firstItem, ...lastItems];
      showEllipsis = true;
    }

    return displayItems.map((item, index) => {
      const isLast = index === displayItems.length - 1;
      const isFirst = index === 0;
      const showEllipsisBefore = showEllipsis && index === 1;

      return (
        <React.Fragment key={item.id}>
          {showEllipsisBefore && (
            <>
              <span className={styles.separator} aria-hidden="true">
                {separator || <ChevronIcon />}
              </span>
              <span className={styles.ellipsis} aria-hidden="true">...</span>
            </>
          )}
          {!isFirst && (
            <span className={styles.separator} aria-hidden="true">
              {separator || <ChevronIcon />}
            </span>
          )}
          {isLast ? (
            <span className={`${styles.item} ${styles.current}`} aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <a href={item.href} className={`${styles.item} ${styles.link}`} onClick={(e) => handleClick(item, e)}>
              {item.label}
            </a>
          ) : (
            <button type="button" className={`${styles.item} ${styles.btn}`} onClick={(e) => handleClick(item, e)}>
              {item.label}
            </button>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <nav className={`${styles.breadcrumb} ${className}`} aria-label="Breadcrumb">
      <ol className={styles.list}>{renderItems()}</ol>
    </nav>
  );
};
