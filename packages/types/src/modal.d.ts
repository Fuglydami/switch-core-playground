import type React from 'react';
export interface ModalBaseProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    primaryAction?: {
        label: string;
        onPress: () => void;
        isLoading?: boolean;
    };
    secondaryAction?: {
        label: string;
        onPress: () => void;
    };
}
//# sourceMappingURL=modal.d.ts.map