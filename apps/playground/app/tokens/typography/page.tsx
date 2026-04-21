import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Typography' };

const FONT_SIZES = [
  { key: 'xs', value: '12px' }, { key: 'sm', value: '14px' },
  { key: 'md', value: '16px' }, { key: 'lg', value: '18px' },
  { key: 'xl', value: '20px' }, { key: '2xl', value: '24px' },
  { key: '3xl', value: '30px' }, { key: '4xl', value: '36px' },
];

const FONT_WEIGHTS = [
  { key: 'regular', value: 400 }, { key: 'medium', value: 500 },
  { key: 'semibold', value: 600 }, { key: 'bold', value: 700 },
];

export default function TypographyPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Typography</h1>
      <p style={{ color: '#6b7280', margin: '0 0 40px' }}>Font families, sizes, and weights for Switch Core.</p>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Font Sizes</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40 }}>
        {FONT_SIZES.map(({ key, value }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#fff', padding: '16px 16px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <span style={{ width: 60, fontSize: 12, fontFamily: 'var(--switch-typography-font-family-mono)', color: '#9ca3af' }}>fontSize.{key}</span>
            <span style={{ width: 48, fontSize: 12, color: '#9ca3af' }}>{value}</span>
            <span style={{ fontSize: value, fontWeight: 500, color: 'var(--switch-color-semantic-primary)' }}>
              The quick brown fox
            </span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Font Weights</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FONT_WEIGHTS.map(({ key, value }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#fff', padding: '16px 16px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <span style={{ width: 120, fontSize: 12, fontFamily: 'var(--switch-typography-font-family-mono)', color: '#9ca3af' }}>fontWeight.{key}</span>
            <span style={{ width: 40, fontSize: 12, color: '#9ca3af' }}>{value}</span>
            <span style={{ fontSize: 18, fontWeight: value, color: 'var(--switch-color-semantic-primary)' }}>
              Switch Core Design System
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
