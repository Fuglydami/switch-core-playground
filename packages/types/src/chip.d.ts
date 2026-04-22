export type ChipSize = 'small' | 'medium';
export interface ChipBaseProps {
    /** Chip label text */
    label: string;
    /** Badge count displayed after label */
    count?: number;
    /** Callback when close button is clicked (shows close button when provided) */
    onRemove?: () => void;
    /** Whether chip is in selected state */
    selected?: boolean;
    /** Callback for selectable chips */
    onSelect?: (selected: boolean) => void;
    /** Chip size variant */
    size?: ChipSize;
    /** Whether chip is disabled */
    disabled?: boolean;
}
//# sourceMappingURL=chip.d.ts.map