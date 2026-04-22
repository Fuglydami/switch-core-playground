export type ToastType = 'info' | 'success' | 'warning' | 'error';
export interface ToastBaseProps {
    type: ToastType;
    message: string;
    description?: string;
    /** ms — default 5000. Use Infinity to persist until dismissed. */
    duration?: number;
    onDismiss?: () => void;
}
//# sourceMappingURL=toast.d.ts.map