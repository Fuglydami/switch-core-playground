export interface DatePickerBaseProps {
    /** Controlled selected date */
    value?: Date | null;
    /** Called when the user selects a date */
    onChange: (date: Date) => void;
    /** Label rendered above the trigger */
    label?: string;
    /** Placeholder shown when no date is selected */
    placeholder?: string;
    /** Earliest selectable date (inclusive) */
    minDate?: Date;
    /** Latest selectable date (inclusive) */
    maxDate?: Date;
    /** Whether the picker is disabled */
    disabled?: boolean;
    /** Applies error styling */
    isError?: boolean;
    /** Error message rendered below the trigger */
    errorMessage?: string;
}
//# sourceMappingURL=date-picker.d.ts.map