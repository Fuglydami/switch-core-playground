import React from 'react';
import styles from './Table.module.css';

export interface TableColumn<T = Record<string, unknown>> {
  /** Unique key matching a data row property */
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  /** Enable sort on this column */
  sortable?: boolean;
  /** Column width (e.g. '120px', '1fr') */
  width?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  /** Key property that uniquely identifies each row */
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  onRowClick?: (row: T, index: number) => void;
  /** Zebra-stripe rows */
  striped?: boolean;
  /** Show border between all rows and columns */
  bordered?: boolean;
  /** Compact padding */
  dense?: boolean;
  /** Empty state message */
  emptyMessage?: React.ReactNode;
  /** Controlled sort column */
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  className?: string;
  'aria-label'?: string;
}

function ChevronUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === 'asc') return <ChevronUp />;
  if (direction === 'desc') return <ChevronDown />;
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={styles.sortIconDefault}>
      <path d="M2 4l4-2 4 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 8l4 2 4-2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  rowKey,
  onRowClick,
  striped = false,
  bordered = false,
  dense = false,
  emptyMessage = 'No data available.',
  sortKey,
  sortDirection = 'none',
  onSort,
  className,
  'aria-label': ariaLabel,
}: TableProps<T>) {
  const getRowKey = (row: T, index: number): string | number => {
    if (!rowKey) return index;
    if (typeof rowKey === 'function') return rowKey(row, index);
    return row[rowKey] as string | number;
  };

  const handleSort = (colKey: string) => {
    if (!onSort) return;
    if (sortKey !== colKey) {
      onSort(colKey, 'asc');
    } else if (sortDirection === 'asc') {
      onSort(colKey, 'desc');
    } else {
      onSort(colKey, 'none');
    }
  };

  const tableClass = [
    styles.table,
    striped ? styles.striped : '',
    bordered ? styles.bordered : '',
    dense ? styles.dense : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper} role="region" aria-label={ariaLabel}>
      <table className={tableClass}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              const direction = isSorted ? sortDirection : 'none';
              return (
                <th
                  key={col.key}
                  className={[
                    styles.th,
                    col.sortable ? styles.sortable : '',
                    col.align ? styles[col.align] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={col.width ? { width: col.width } : undefined}
                  aria-sort={
                    col.sortable
                      ? direction === 'asc'
                        ? 'ascending'
                        : direction === 'desc'
                        ? 'descending'
                        : 'none'
                      : undefined
                  }
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className={styles.thInner}>
                    {col.header}
                    {col.sortable && (
                      <span className={[styles.sortIcon, isSorted ? styles.sorted : ''].filter(Boolean).join(' ')}>
                        <SortIcon direction={direction} />
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className={[
                  styles.tr,
                  onRowClick ? styles.clickable : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onRowClick(row, rowIndex);
                        }
                      }
                    : undefined
                }
              >
                {columns.map((col) => {
                  const raw = (row as Record<string, unknown>)[col.key];
                  const cell = col.render ? col.render(raw, row, rowIndex) : (raw as React.ReactNode);
                  return (
                    <td
                      key={col.key}
                      className={[styles.td, col.align ? styles[col.align] : ''].filter(Boolean).join(' ')}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
