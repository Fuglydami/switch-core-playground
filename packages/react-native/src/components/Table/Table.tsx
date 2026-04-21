import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { styles } from './Table.styles';

export interface TableColumn<T = Record<string, unknown>> {
  /** Unique key matching a data row property */
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  /** Enable sort on this column */
  sortable?: boolean;
  /** Column width (number for flex, or fixed) */
  width?: number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  /** Key property that uniquely identifies each row */
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  onRowPress?: (row: T, index: number) => void;
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
  /** Horizontal scroll when content exceeds width */
  horizontal?: boolean;
}

function ChevronUp() {
  return (
    <Text style={{ fontSize: 10, color: '#5F738C' }}>{'\u25B2'}</Text>
  );
}

function ChevronDown() {
  return (
    <Text style={{ fontSize: 10, color: '#5F738C' }}>{'\u25BC'}</Text>
  );
}

function SortIcon({ direction, active }: { direction: SortDirection; active: boolean }) {
  const iconStyle = active ? styles.sortIconActive : styles.sortIcon;

  if (direction === 'asc') {
    return <View style={iconStyle}><ChevronUp /></View>;
  }
  if (direction === 'desc') {
    return <View style={iconStyle}><ChevronDown /></View>;
  }
  return (
    <View style={iconStyle}>
      <Text style={{ fontSize: 8, color: '#5F738C', lineHeight: 10 }}>{'\u25B2'}{'\n'}{'\u25BC'}</Text>
    </View>
  );
}

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  rowKey,
  onRowPress,
  striped = false,
  bordered = false,
  dense = false,
  emptyMessage = 'No data available.',
  sortKey,
  sortDirection = 'none',
  onSort,
  horizontal = false,
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

  const renderHeader = () => (
    <View style={styles.thead}>
      <View style={styles.headerRow}>
        {columns.map((col, colIndex) => {
          const isSorted = sortKey === col.key;
          const direction = isSorted ? sortDirection : 'none';
          const isLast = colIndex === columns.length - 1;

          const headerContent = (
            <View
              style={[
                styles.th,
                dense && styles.thDense,
                bordered && styles.thBordered,
                bordered && isLast && styles.thBorderedLast,
                col.width ? { width: col.width } : { flex: 1 },
                col.align && styles[col.align],
              ]}
            >
              {typeof col.header === 'string' ? (
                <Text style={styles.thText}>{col.header}</Text>
              ) : (
                col.header
              )}
              {col.sortable && <SortIcon direction={direction} active={isSorted} />}
            </View>
          );

          if (col.sortable) {
            return (
              <Pressable
                key={col.key}
                onPress={() => handleSort(col.key)}
                accessibilityRole="button"
                accessibilityLabel={`Sort by ${typeof col.header === 'string' ? col.header : col.key}`}
              >
                {headerContent}
              </Pressable>
            );
          }

          return <View key={col.key}>{headerContent}</View>;
        })}
      </View>
    </View>
  );

  const renderRow = (row: T, rowIndex: number) => {
    const isLast = rowIndex === data.length - 1;
    const isStriped = striped && rowIndex % 2 === 1;

    const rowContent = (
      <View
        style={[
          styles.tr,
          isLast && styles.trLast,
          isStriped && styles.trStriped,
        ]}
      >
        {columns.map((col, colIndex) => {
          const raw = (row as Record<string, unknown>)[col.key];
          const cell = col.render ? col.render(raw, row, rowIndex) : raw;
          const isLastCol = colIndex === columns.length - 1;

          return (
            <View
              key={col.key}
              style={[
                styles.td,
                dense && styles.tdDense,
                bordered && styles.tdBordered,
                bordered && isLastCol && styles.tdBorderedLast,
                col.width ? { width: col.width } : { flex: 1 },
                col.align && styles[col.align],
              ]}
            >
              {typeof cell === 'string' || typeof cell === 'number' ? (
                <Text style={styles.tdText}>{String(cell)}</Text>
              ) : (
                cell as React.ReactNode
              )}
            </View>
          );
        })}
      </View>
    );

    if (onRowPress) {
      return (
        <Pressable
          key={getRowKey(row, rowIndex)}
          onPress={() => onRowPress(row, rowIndex)}
          accessibilityRole="button"
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          {rowContent}
        </Pressable>
      );
    }

    return <View key={getRowKey(row, rowIndex)}>{rowContent}</View>;
  };

  const renderEmptyState = () => (
    <View style={styles.empty}>
      {typeof emptyMessage === 'string' ? (
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      ) : (
        emptyMessage
      )}
    </View>
  );

  const tableContent = (
    <View style={styles.table} accessibilityRole="none">
      {renderHeader()}
      <View style={styles.tbody}>
        {data.length === 0 ? renderEmptyState() : data.map(renderRow)}
      </View>
    </View>
  );

  if (horizontal) {
    return (
      <View style={styles.wrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator style={styles.scrollView}>
          {tableContent}
        </ScrollView>
      </View>
    );
  }

  return <View style={styles.wrapper}>{tableContent}</View>;
}
