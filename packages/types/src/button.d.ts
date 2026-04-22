import type React from 'react';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link';
export type ButtonShape = 'rectangular' | 'pill' | 'square' | 'circle';
export type ButtonColor = 'popBlue' | 'activeBlue' | 'primaryBlue' | 'monochrome';
export interface ButtonBaseProps {
    size?: ButtonSize;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    colorScheme?: ButtonColor;
    isLoading?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    children: React.ReactNode;
}
//# sourceMappingURL=button.d.ts.map