export type SortDirection = 'asc' | 'desc' | 'none';
export interface TableColumnBase {
    /** Unique key matching a data row property */
    key: string;
    /** Enable sort on this column */
    sortable?: boolean;
    /** Column width (e.g. '120px', '1fr') */
    width?: string;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
}
export interface TableBaseProps {
    /** Zebra-stripe rows */
    striped?: boolean;
    /** Show border between all rows and columns */
    bordered?: boolean;
    /** Compact padding */
    dense?: boolean;
    /** Controlled sort column */
    sortKey?: string;
    sortDirection?: SortDirection;
}
//# sourceMappingURL=table.d.ts.map