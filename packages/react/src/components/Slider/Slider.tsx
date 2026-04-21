import React from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
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
  size?: 'small' | 'large';
  className?: string;
  'aria-label'?: string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  disabled = false,
  showLabels = false,
  formatLabel,
  size = 'large',
  className,
  'aria-label': ariaLabel,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const pct = ((value - min) / (max - min)) * 100;
  const fmt = formatLabel ?? ((v: number) => String(v));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={[styles.track, styles[size]].join(' ')}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className={styles.input}
        />
      </div>
      {showLabels && (
        <div className={styles.labels}>
          <span>{fmt(min)}</span>
          <span>{fmt(max)}</span>
        </div>
      )}
    </div>
  );
}

// ── Range Slider (dual handle) ─────────────────────────────────────────────

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  disabled?: boolean;
  showLabels?: boolean;
  formatLabel?: (value: number) => string;
  size?: 'small' | 'large';
  className?: string;
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = [0, 100],
  onChange,
  disabled = false,
  showLabels = false,
  formatLabel,
  size = 'large',
  className,
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = React.useState<[number, number]>(defaultValue);
  const [low, high] = controlledValue ?? internalValue;
  const fmt = formatLabel ?? ((v: number) => String(v));

  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  const handleLow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(Number(e.target.value), high - step);
    const pair: [number, number] = [next, high];
    setInternalValue(pair);
    onChange?.(pair);
  };

  const handleHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(Number(e.target.value), low + step);
    const pair: [number, number] = [low, next];
    setInternalValue(pair);
    onChange?.(pair);
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={[styles.track, styles.rangeTrack, styles[size]].join(' ')}>
        <div
          className={styles.rangeFill}
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={low}
          disabled={disabled}
          onChange={handleLow}
          aria-label="Minimum value"
          className={[styles.input, styles.inputLow].join(' ')}
        />
        <input
          type="range" min={min} max={max} step={step} value={high}
          disabled={disabled}
          onChange={handleHigh}
          aria-label="Maximum value"
          className={[styles.input, styles.inputHigh].join(' ')}
        />
      </div>
      {showLabels && (
        <div className={styles.labels}>
          <span>{fmt(low)}</span>
          <span>{fmt(high)}</span>
        </div>
      )}
    </div>
  );
}
