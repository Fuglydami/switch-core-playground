'use client';

import { ReactNode } from 'react';

interface ComponentPreviewProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function ComponentPreview({ children, title, className }: ComponentPreviewProps) {
  return (
    <div
      style={{
        border: '1px solid var(--switch-color-border-default, #e5e7eb)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      {title && (
        <div
          style={{
            padding: '8px 16px',
            background: 'var(--switch-color-surface-grey, #f9fafb)',
            borderBottom: '1px solid var(--switch-color-border-default, #e5e7eb)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--switch-color-text-secondary, #6b7280)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </div>
      )}
      <div
        className={className}
        style={{
          padding: 24,
          background: 'var(--switch-color-surface-primary, #ffffff)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface PreviewGridProps {
  children: ReactNode;
  columns?: number;
}

export function PreviewGrid({ children, columns = 1 }: PreviewGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 16,
      }}
    >
      {children}
    </div>
  );
}

interface PreviewItemProps {
  children: ReactNode;
  label?: string;
}

export function PreviewItem({ children, label }: PreviewItemProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {children}
      {label && (
        <span
          style={{
            fontSize: 12,
            color: 'var(--switch-color-text-secondary, #6b7280)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
