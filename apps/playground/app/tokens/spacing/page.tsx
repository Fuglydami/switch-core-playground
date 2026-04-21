import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Spacing — Design Tokens' };

const SPACING = [
  { px: 4 },  { px: 8 },  { px: 12 }, { px: 16 }, { px: 24 },
  { px: 32 }, { px: 40 }, { px: 48 }, { px: 56 }, { px: 64 },
  { px: 72 }, { px: 80 }, { px: 88 }, { px: 96 }, { px: 104 },
  { px: 120 },{ px: 128 },{ px: 192 },{ px: 256 },
];

const MAX_PX = 256;
const MAX_BAR_WIDTH = 260; // px, visual cap

export default function SpacingPage() {
  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px', color: 'var(--switch-color-text-primary)' }}>
          Spacing
        </h1>
        <p style={{ fontSize: 15, color: 'var(--switch-color-text-secondary)', margin: '0 0 4px', lineHeight: 1.6 }}>
          Units
        </p>
        <p style={{ fontSize: 13, color: 'var(--switch-color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
          Primary values used on general pages. These values are used for padding, margin,
          gap, and layout spacing.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {SPACING.map(({ px }) => {
          const barWidth = Math.round((px / MAX_PX) * MAX_BAR_WIDTH);
          const cssVar = `--switch-spacing-${px === 4 ? 1 : px === 8 ? 2 : px === 12 ? 3 : px === 16 ? 4 : px === 20 ? 5 : px === 24 ? 6 : px === 28 ? 7 : px === 32 ? 8 : px === 40 ? 10 : px === 48 ? 12 : px === 56 ? 14 : px === 64 ? 16 : px === 72 ? 18 : px === 80 ? 20 : px === 88 ? 22 : px === 96 ? 24 : px === 104 ? 26 : px === 120 ? 30 : px === 128 ? 32 : px === 192 ? 48 : 64}`;

          return (
            <div
              key={px}
              style={{
                display: 'grid',
                gridTemplateColumns: '68px 1fr',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{
                fontSize: 13,
                color: 'var(--switch-color-text-secondary)',
                fontFamily: 'var(--switch-typography-font-family-mono)',
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}>
                {px}px
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  title={cssVar}
                  style={{
                    width: Math.max(barWidth, 3),
                    height: 20,
                    background: 'var(--switch-color-primaryblue-base)',
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Token reference table */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--switch-color-text-primary)', margin: '0 0 16px' }}>
          Token Reference
        </h2>
        <div style={{
          background: 'var(--switch-color-surface-primary)',
          border: '1px solid var(--switch-color-border-default)',
          borderRadius: 10,
          overflow: 'hidden',
          fontSize: 13,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '8px 16px',
            background: 'var(--switch-color-surface-grey)',
            borderBottom: '1px solid var(--switch-color-border-default)',
            fontWeight: 600,
            color: 'var(--switch-color-text-secondary)',
            fontSize: 12,
          }}>
            <span>CSS Variable</span>
            <span>Value</span>
            <span style={{ fontFamily: 'var(--switch-typography-font-family-mono)' }}>REM</span>
          </div>
          {SPACING.map(({ px }, i) => {
            const scale = px === 4 ? 1 : px === 8 ? 2 : px === 12 ? 3 : px === 16 ? 4 : px === 20 ? 5 : px === 24 ? 6 : px === 28 ? 7 : px === 32 ? 8 : px === 40 ? 10 : px === 48 ? 12 : px === 56 ? 14 : px === 64 ? 16 : px === 72 ? 18 : px === 80 ? 20 : px === 88 ? 22 : px === 96 ? 24 : px === 104 ? 26 : px === 120 ? 30 : px === 128 ? 32 : px === 192 ? 48 : 64;
            return (
              <div
                key={px}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '9px 16px',
                  borderBottom: i < SPACING.length - 1 ? '1px solid var(--switch-color-border-default)' : 'none',
                  alignItems: 'center',
                }}
              >
                <code style={{ fontFamily: 'var(--switch-typography-font-family-mono)', color: 'var(--switch-color-action-primary-fill)', fontSize: 12 }}>
                  --switch-spacing-{scale}
                </code>
                <span style={{ color: 'var(--switch-color-text-primary)' }}>{px}px</span>
                <span style={{ fontFamily: 'var(--switch-typography-font-family-mono)', color: 'var(--switch-color-text-secondary)' }}>
                  {(px / 16).toFixed(px % 16 === 0 ? 0 : 3).replace(/\.?0+$/, '')}rem
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
