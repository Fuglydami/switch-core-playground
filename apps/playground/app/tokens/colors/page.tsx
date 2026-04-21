import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Colors — Design Tokens' };

// ── Primitive ramps ────────────────────────────────────────────────────────
const RAMPS: { label: string; steps: { stop: string; hex: string }[] }[] = [
  {
    label: 'Active Blue',
    steps: [
      { stop: '100', hex: '#EBF8FE' },
      { stop: '200', hex: '#A8D6EF' },
      { stop: '300', hex: '#6EB4E0' },
      { stop: '400', hex: '#0275D8' },
      { stop: '500', hex: '#1A4983' },
      { stop: '600', hex: '#10345E' },
    ],
  },
  {
    label: 'Primary Blue',
    steps: [
      { stop: '100', hex: '#EBF8FE' },
      { stop: '200', hex: '#AEDDF1' },
      { stop: '300', hex: '#7BC6E4' },
      { stop: '400', hex: '#479FC8' },
      { stop: '500', hex: '#307399' },
      { stop: '600', hex: '#18425D' },
      { stop: '700', hex: '#072F40' },
      { stop: 'Base', hex: '#00425F' },
    ],
  },
  {
    label: 'Primary Red',
    steps: [
      { stop: '100', hex: '#FBE9E9' },
      { stop: '200', hex: '#F4B7B5' },
      { stop: '300', hex: '#EF8781' },
      { stop: '400', hex: '#DC4437' },
      { stop: '500', hex: '#A4251A' },
      { stop: '600', hex: '#590C07' },
      { stop: 'Base', hex: '#EE312A' },
    ],
  },
  {
    label: 'Active Yellow',
    steps: [
      { stop: '100', hex: '#FEF6CF' },
      { stop: '200', hex: '#FDED94' },
      { stop: '300', hex: '#F7CA5C' },
      { stop: '400', hex: '#EC9B40' },
      { stop: '500', hex: '#AF5F26' },
      { stop: '600', hex: '#6B2B0D' },
    ],
  },
  {
    label: 'Active Green',
    steps: [
      { stop: '100', hex: '#F1FEF1' },
      { stop: '200', hex: '#BEF2B9' },
      { stop: '300', hex: '#74C965' },
      { stop: '400', hex: '#519E47' },
      { stop: '500', hex: '#36743D' },
      { stop: '600', hex: '#163C29' },
    ],
  },
  {
    label: 'Neutral',
    steps: [
      { stop: '100', hex: '#F9FBFC' },
      { stop: '200', hex: '#F3F5F6' },
      { stop: '300', hex: '#E1E6ED' },
      { stop: '400', hex: '#C8D2DF' },
      { stop: '500', hex: '#AAB7C6' },
      { stop: '600', hex: '#848F9F' },
      { stop: '700', hex: '#5F738C' },
      { stop: '800', hex: '#4E5A6C' },
      { stop: '900', hex: '#353F50' },
      { stop: '1000', hex: '#1F2126' },
    ],
  },
];

// ── Semantic tokens ────────────────────────────────────────────────────────
const SEMANTIC_GROUPS: {
  label: string;
  rows: { name: string; cssVar: string; hex: string; description: string }[];
}[] = [
  {
    label: 'Action',
    rows: [
      { name: 'action.primary.fill',  cssVar: '--switch-color-action-primary-fill',  hex: '#0275D8', description: 'Primary button background' },
      { name: 'action.primary.label', cssVar: '--switch-color-action-primary-label', hex: '#FFFFFF', description: 'Primary button text' },
      { name: 'action.primary.hover', cssVar: '--switch-color-action-primary-hover', hex: '#1A4983', description: 'Primary button hover' },
    ],
  },
  {
    label: 'Surface',
    rows: [
      { name: 'surface.primary',   cssVar: '--switch-color-surface-primary',   hex: '#FFFFFF', description: 'Page / card background' },
      { name: 'surface.secondary', cssVar: '--switch-color-surface-secondary', hex: '#F9FBFC', description: 'Subtle surface' },
      { name: 'surface.grey',      cssVar: '--switch-color-surface-grey',      hex: '#F3F5F6', description: 'Input fill / muted surface' },
    ],
  },
  {
    label: 'Text',
    rows: [
      { name: 'text.primary',     cssVar: '--switch-color-text-primary',     hex: '#353F50', description: 'Body / heading text' },
      { name: 'text.secondary',   cssVar: '--switch-color-text-secondary',   hex: '#5F738C', description: 'Muted / supporting text' },
      { name: 'text.disabled',    cssVar: '--switch-color-text-disabled',    hex: '#AAB7C6', description: 'Disabled state text' },
      { name: 'text.placeholder', cssVar: '--switch-color-text-placeholder', hex: '#848F9F', description: 'Input placeholder' },
    ],
  },
  {
    label: 'Status',
    rows: [
      { name: 'status.error',   cssVar: '--switch-color-status-error',   hex: '#DC4437', description: 'Error / destructive' },
      { name: 'status.warning', cssVar: '--switch-color-status-warning', hex: '#EC9B40', description: 'Warning' },
      { name: 'status.success', cssVar: '--switch-color-status-success', hex: '#519E47', description: 'Success / confirmation' },
      { name: 'status.info',    cssVar: '--switch-color-status-info',    hex: '#0275D8', description: 'Informational' },
    ],
  },
  {
    label: 'Border',
    rows: [
      { name: 'border.default', cssVar: '--switch-color-border-default', hex: '#E1E6ED', description: 'Default dividers' },
      { name: 'border.strong',  cssVar: '--switch-color-border-strong',  hex: '#C8D2DF', description: 'Input stroke' },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function isDark(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function ColorsPage() {
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px', color: 'var(--switch-color-text-primary)' }}>
          Colors
        </h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', margin: 0, fontSize: 15, lineHeight: 1.6 }}>
          All color tokens sourced from the Switch Figma design system. Use semantic tokens
          in component code; primitive ramps for reference only.
        </p>
      </div>

      {/* Primitive ramps */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 20px', color: 'var(--switch-color-text-primary)' }}>
          Primitive Ramps
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {RAMPS.map((ramp) => (
            <div key={ramp.label}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--switch-color-text-secondary)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {ramp.label}
              </p>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {ramp.steps.map((s) => (
                  <div
                    key={s.stop}
                    title={`${s.stop} — ${s.hex}`}
                    style={{
                      flex: '1 0 64px',
                      minWidth: 64,
                      maxWidth: 100,
                      height: 64,
                      borderRadius: 8,
                      background: s.hex,
                      border: s.hex === '#FFFFFF' || s.hex === '#F9FBFC' || s.hex === '#F3F5F6' || s.hex === '#EBF8FE' || s.hex === '#FEF6CF' || s.hex === '#F1FEF1' || s.hex === '#FBE9E9'
                        ? '1px solid var(--switch-color-border-default)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: isDark(s.hex) ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.55)' }}>
                      {s.stop}
                    </span>
                    <span style={{ fontSize: 9, fontFamily: 'var(--switch-typography-font-family-mono)', color: isDark(s.hex) ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }}>
                      {s.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic tokens */}
      <section>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px', color: 'var(--switch-color-text-primary)' }}>
          Semantic Tokens
        </h2>
        <p style={{ fontSize: 14, color: 'var(--switch-color-text-secondary)', margin: '0 0 20px' }}>
          Always use these in component code — they switch automatically in dark mode.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {SEMANTIC_GROUPS.map((group) => (
            <div key={group.label}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--switch-color-text-secondary)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {group.label}
              </p>
              <div style={{ background: 'var(--switch-color-surface-primary)', border: '1px solid var(--switch-color-border-default)', borderRadius: 10, overflow: 'hidden' }}>
                {group.rows.map((row, i) => (
                  <div
                    key={row.name}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr 1fr 1fr',
                      alignItems: 'center',
                      gap: 16,
                      padding: '10px 16px',
                      borderBottom: i < group.rows.length - 1 ? '1px solid var(--switch-color-border-default)' : 'none',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 6, background: row.hex, flexShrink: 0,
                      border: row.hex === '#FFFFFF' ? '1px solid var(--switch-color-border-default)' : 'none',
                    }} />
                    <code style={{ fontSize: 12, color: 'var(--switch-color-text-primary)', fontFamily: 'var(--switch-typography-font-family-mono)' }}>
                      {row.name}
                    </code>
                    <code style={{ fontSize: 11, color: 'var(--switch-color-text-secondary)', fontFamily: 'var(--switch-typography-font-family-mono)' }}>
                      {row.cssVar}
                    </code>
                    <span style={{ fontSize: 13, color: 'var(--switch-color-text-secondary)' }}>
                      {row.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
