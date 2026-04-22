import { useCallback, useEffect, useId, useReducer, useRef } from 'react';
import type { DatePickerBaseProps } from '../../types';
import styles from './DatePicker.module.css';

export interface DatePickerProps extends DatePickerBaseProps {
  /** ID forwarded to the trigger button */
  id?: string;
}

// ─── helpers ────────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeDay(a: Date, b: Date) {
  return a < new Date(b.getFullYear(), b.getMonth(), b.getDate());
}

function isAfterDay(a: Date, b: Date) {
  return a > new Date(b.getFullYear(), b.getMonth(), b.getDate() + 1, -1);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// ─── reducer ────────────────────────────────────────────────────────────────

type State = { open: boolean; viewYear: number; viewMonth: number };
type Action =
  | { type: 'OPEN'; year: number; month: number }
  | { type: 'CLOSE' }
  | { type: 'PREV_MONTH' }
  | { type: 'NEXT_MONTH' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN':
      return { open: true, viewYear: action.year, viewMonth: action.month };
    case 'CLOSE':
      return { ...state, open: false };
    case 'PREV_MONTH': {
      const prev = new Date(state.viewYear, state.viewMonth - 1, 1);
      return { ...state, viewYear: prev.getFullYear(), viewMonth: prev.getMonth() };
    }
    case 'NEXT_MONTH': {
      const next = new Date(state.viewYear, state.viewMonth + 1, 1);
      return { ...state, viewYear: next.getFullYear(), viewMonth: next.getMonth() };
    }
    default:
      return state;
  }
}

// ─── component ──────────────────────────────────────────────────────────────

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select a date',
  minDate,
  maxDate,
  disabled = false,
  isError = false,
  errorMessage,
  id: idProp,
}: DatePickerProps) {
  const autoId = useId();
  const triggerId = idProp ?? autoId;
  const calendarId = `${triggerId}-calendar`;
  const errorId = `${triggerId}-error`;

  const today = new Date();
  const initial = value ?? today;

  const [state, dispatch] = useReducer(reducer, {
    open: false,
    viewYear: initial.getFullYear(),
    viewMonth: initial.getMonth(),
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!state.open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        dispatch({ type: 'CLOSE' });
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [state.open]);

  // Close on Escape
  useEffect(() => {
    if (!state.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE' });
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [state.open]);

  const openCalendar = useCallback(() => {
    if (disabled) return;
    const ref = value ?? today;
    dispatch({ type: 'OPEN', year: ref.getFullYear(), month: ref.getMonth() });
  }, [disabled, value, today]);

  const handleDaySelect = useCallback(
    (day: number) => {
      const selected = new Date(state.viewYear, state.viewMonth, day);
      onChange(selected);
      dispatch({ type: 'CLOSE' });
    },
    [onChange, state.viewYear, state.viewMonth]
  );

  // Build calendar grid
  const daysInMonth = getDaysInMonth(state.viewYear, state.viewMonth);
  const firstDay = getFirstDayOfMonth(state.viewYear, state.viewMonth);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete rows
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className={styles.root} ref={containerRef}>
      {label && (
        <label htmlFor={triggerId} className={styles.label}>
          {label}
        </label>
      )}

      <button
        type="button"
        id={triggerId}
        className={[
          styles.trigger,
          isError ? styles.triggerError : '',
          disabled ? styles.triggerDisabled : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={openCalendar}
        aria-haspopup="dialog"
        aria-expanded={state.open}
        aria-controls={calendarId}
        aria-describedby={errorMessage ? errorId : undefined}
        disabled={disabled}
      >
        <span className={value ? styles.triggerValue : styles.triggerPlaceholder}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg
          className={styles.calendarIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
          <path d="M1 7h14" stroke="currentColor" strokeWidth="1.25" />
          <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </button>

      {errorMessage && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {errorMessage}
        </span>
      )}

      {state.open && (
        <div
          id={calendarId}
          role="dialog"
          aria-label={`Choose a date. Currently viewing ${MONTH_NAMES[state.viewMonth]} ${state.viewYear}`}
          aria-modal="true"
          className={styles.calendar}
        >
          {/* Header */}
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => dispatch({ type: 'PREV_MONTH' })}
              aria-label="Previous month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className={styles.monthLabel} aria-live="polite">
              {MONTH_NAMES[state.viewMonth]} {state.viewYear}
            </span>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => dispatch({ type: 'NEXT_MONTH' })}
              aria-label="Next month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Day-of-week row */}
          <div className={styles.dayRow} aria-hidden="true">
            {DAY_LABELS.map((d) => (
              <span key={d} className={styles.dayLabel}>
                {d}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div className={styles.grid} role="grid" aria-label={`${MONTH_NAMES[state.viewMonth]} ${state.viewYear}`}>
            {cells.map((day, idx) => {
              if (day === null) {
                return <span key={`empty-${idx}`} className={styles.emptyCell} role="gridcell" aria-hidden="true" />;
              }

              const date = new Date(state.viewYear, state.viewMonth, day);
              const isSelected = value ? isSameDay(date, value) : false;
              const isToday = isSameDay(date, today);
              const tooEarly = minDate ? isBeforeDay(date, minDate) : false;
              const tooLate = maxDate ? isAfterDay(date, maxDate) : false;
              const isDisabled = tooEarly || tooLate;

              return (
                <button
                  key={day}
                  type="button"
                  role="gridcell"
                  aria-selected={isSelected}
                  aria-label={date.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => !isDisabled && handleDaySelect(day)}
                  className={[
                    styles.dayCell,
                    isSelected ? styles.dayCellSelected : '',
                    isToday && !isSelected ? styles.dayCellToday : '',
                    isDisabled ? styles.dayCellDisabled : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
