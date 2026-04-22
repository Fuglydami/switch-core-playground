export type SliderSize = 'small' | 'large';
export interface SliderBaseProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    /** Show min/max labels below track */
    showLabels?: boolean;
    /** Format value for display */
    formatLabel?: (value: number) => string;
    size?: SliderSize;
}
export interface RangeSliderBaseProps {
    min?: number;
    max?: number;
    step?: number;
    value?: [number, number];
    defaultValue?: [number, number];
    onChange?: (value: [number, number]) => void;
    disabled?: boolean;
    showLabels?: boolean;
    formatLabel?: (value: number) => string;
    size?: SliderSize;
}
//# sourceMappingURL=slider.d.ts.map