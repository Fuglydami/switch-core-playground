import React, { useState, useMemo } from 'react';
import { Table, TableColumn } from '../Table/Table';
import { SearchInput } from '../SearchInput/SearchInput';
import { Select } from '../Input';
import { RingLoader } from '../Loader/Loader';
import { EmptyState } from '../EmptyState/EmptyState';
import styles from './DataTable.module.css';

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
}

export interface DataTableProps<T extends { id: string | number }> {
  /** Table columns configuration */
  columns: DataTableColumn<T>[];
  /** Table data */
  data: T[];
  /** Enable search */
  searchable?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search fields - which columns to search in */
  searchFields?: (keyof T)[];
  /** Enable pagination */
  paginated?: boolean;
  /** Rows per page options */
  rowsPerPageOptions?: number[];
  /** Default rows per page */
  defaultRowsPerPage?: number;
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row IDs */
  selectedIds?: (string | number)[];
  /** Called when selection changes */
  onSelectionChange?: (ids: (string | number)[]) => void;
  /** Called when row is clicked */
  onRowClick?: (row: T) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state icon */
  emptyIcon?: React.ReactNode;
  /** Header actions (rendered next to search) */
  headerActions?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchFields,
  paginated = false,
  rowsPerPageOptions = [10, 25, 50, 100],
  defaultRowsPerPage = 10,
  selectable: _selectable = false,
  selectedIds: _selectedIds = [],
  onSelectionChange: _onSelectionChange,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data found',
  emptyIcon,
  headerActions,
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery || !searchable) return data;

    const query = searchQuery.toLowerCase();
    const fields = searchFields || (columns.map(c => typeof c.accessor === 'string' ? c.accessor : null).filter(Boolean) as (keyof T)[]);

    return data.filter(row => {
      return fields.some(field => {
        const value = row[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, searchable, searchFields, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return filteredData;

    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, paginated, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, filteredData.length);

  // Reset page when search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Convert columns to Table format
  const tableColumns: TableColumn<T>[] = columns.map(col => ({
    key: col.id,
    header: col.header,
    render: col.render
      ? (value: unknown, row: T) => col.render!(value, row)
      : typeof col.accessor === 'function'
        ? (_: unknown, row: T) => (col.accessor as (row: T) => React.ReactNode)(row)
        : undefined,
  }));

  if (isLoading) {
    return (
      <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
        <div className={styles.loading}>
          <RingLoader size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {/* Header */}
      {(searchable || headerActions) && (
        <div className={styles.header}>
          {searchable && (
            <SearchInput
              placeholder={searchPlaceholder}
              onSearch={handleSearch}
              className={styles.search}
            />
          )}
          {headerActions && (
            <div className={styles.actions}>{headerActions}</div>
          )}
        </div>
      )}

      {/* Table */}
      {paginatedData.length > 0 ? (
        <Table
          columns={tableColumns}
          data={paginatedData}
          rowKey="id"
          onRowClick={onRowClick ? (row) => onRowClick(row) : undefined}
        />
      ) : (
        <EmptyState
          illustration={emptyIcon}
          title={emptyMessage}
          description={searchQuery ? 'Try adjusting your search terms' : undefined}
        />
      )}

      {/* Pagination */}
      {paginated && filteredData.length > 0 && (
        <div className={styles.pagination}>
          <span className={styles.resultCount}>
            {filteredData.length} results
          </span>

          <div className={styles.paginationControls}>
            <span className={styles.rowsLabel}>Rows per page:</span>
            <Select
              value={String(rowsPerPage)}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              options={rowsPerPageOptions.map(n => ({ label: String(n), value: String(n) }))}
              className={styles.rowsSelect}
            />

            <span className={styles.pageInfo}>
              {startRow}-{endRow} of {filteredData.length}
            </span>

            <div className={styles.pageButtons}>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
