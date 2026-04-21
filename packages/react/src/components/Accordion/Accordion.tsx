import React from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  label: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once */
  multiple?: boolean;
  /** IDs of initially expanded panels */
  defaultOpen?: string[];
  /** Controlled open state */
  openIds?: string[];
  onToggle?: (openIds: string[]) => void;
  /** Visual variant: bordered (default) or borderless */
  variant?: 'bordered' | 'borderless';
  className?: string;
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  openIds: controlledOpen,
  onToggle,
  variant = 'bordered',
  className,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = React.useState<string[]>(defaultOpen);

  const openIds = controlledOpen ?? internalOpen;

  const toggle = (id: string) => {
    let next: string[];
    if (openIds.includes(id)) {
      next = openIds.filter((x) => x !== id);
    } else {
      next = multiple ? [...openIds, id] : [id];
    }
    setInternalOpen(next);
    onToggle?.(next);
  };

  const accordionClasses = [
    styles.accordion,
    variant === 'borderless' ? styles.borderless : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={accordionClasses}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headingId = `accordion-heading-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={[styles.item, item.disabled ? styles.disabled : '']
              .filter(Boolean)
              .join(' ')}
          >
            <button
              id={headingId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              className={[styles.trigger, isOpen ? styles.open : '']
                .filter(Boolean)
                .join(' ')}
            >
              {item.icon && (
                <span className={styles.leadingIcon} aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className={styles.label}>{item.label}</span>
              <span
                className={[styles.chevron, isOpen ? styles.chevronOpen : '']
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              aria-hidden={!isOpen}
              data-expanded={isOpen}
              className={styles.panel}
            >
              <div className={styles.panelContent}>
                <div className={styles.panelInner}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
