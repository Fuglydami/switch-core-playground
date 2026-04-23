'use client';

import { Card, StatCard } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview, PreviewItem } from '@/components/ComponentPreview';

const WEB_CODE = `import { Card, StatCard } from 'switch-core-react';

// Generic card container
<Card shadow="base" padding="medium">
  <h3>Card title</h3>
  <p>Any content here.</p>
</Card>

// Clickable card
<Card onPress={() => router.push('/details')}>
  <p>Click to navigate</p>
</Card>

// Stat / metric card
<StatCard
  title="Total Financial Institutions"
  value="190"
  trend={{ value: '31%', direction: 'up' }}
  action="View Details"
  onAction={() => router.push('/institutions')}
/>`;

const RN_CODE = `import { Card, StatCard } from 'switch-core-react-native';

// Generic card container
<Card shadow="base" padding="medium">
  <Text style={styles.title}>Card title</Text>
  <Text>Any content here.</Text>
</Card>

// Pressable card with animation (built-in scale animation)
<Card onPress={() => navigation.navigate('Details')}>
  <Text>Tap to navigate</Text>
</Card>

// Stat / metric card
<StatCard
  title="Total Financial Institutions"
  value="190"
  trend={{ value: '31%', direction: 'up' }}
  action="View Details"
  onAction={() => navigation.navigate('Institutions')}
/>`;

const CARD_PROPS = [
  { name: 'children', type: 'React.ReactNode', required: true,  description: 'Card body content' },
  { name: 'shadow',   type: '"none" | "base" | "small" | "medium"', default: '"base"',   description: 'Box shadow depth' },
  { name: 'padding',  type: '"none" | "small" | "medium" | "large"', default: '"medium"', description: 'Inner padding' },
  { name: 'onClick',  type: '() => void',      default: '—',    description: 'Makes card clickable/pressable' },
  { name: 'className', type: 'string',         default: '—',    description: 'Extra class on the card element (web only)' },
];

const STAT_PROPS = [
  { name: 'title',    type: 'string',          required: true,  description: 'Category label shown above the value' },
  { name: 'value',    type: 'string | number', required: true,  description: 'The primary metric value' },
  { name: 'trend',    type: '{ value: string; direction: "up" | "down" | "neutral" }', default: '—', description: 'Trend badge shown next to the value' },
  { name: 'action',   type: 'string',          default: '—',    description: 'CTA link label (e.g. "View Details")' },
  { name: 'onAction', type: '() => void',      default: '—',    description: 'Called when the action link is clicked' },
  { name: 'icon',     type: 'React.ReactNode', default: '—',    description: 'Optional icon in the top-right corner' },
];

const BankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CardPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Card</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Two exports: <strong>Card</strong> — a generic bordered container with configurable shadow and padding, and <strong>StatCard</strong> — a metric display card with trend badge, title, value, and optional action link.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Basic Card">
          <Card shadow="base" padding="medium">
            <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Card title</h3>
            <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>
              This is a basic card with some content inside.
            </p>
          </Card>
        </ComponentPreview>

        <ComponentPreview title="Shadow Variants">
          <PreviewItem label="None">
            <Card shadow="none" padding="medium">
              <p style={{ margin: 0, fontSize: 14 }}>No shadow</p>
            </Card>
          </PreviewItem>
          <PreviewItem label="Small">
            <Card shadow="small" padding="medium">
              <p style={{ margin: 0, fontSize: 14 }}>Small shadow</p>
            </Card>
          </PreviewItem>
          <PreviewItem label="Base">
            <Card shadow="base" padding="medium">
              <p style={{ margin: 0, fontSize: 14 }}>Base shadow</p>
            </Card>
          </PreviewItem>
          <PreviewItem label="Medium">
            <Card shadow="medium" padding="medium">
              <p style={{ margin: 0, fontSize: 14 }}>Medium shadow</p>
            </Card>
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="Padding Variants">
          <PreviewItem label="None">
            <Card shadow="base" padding="none">
              <p style={{ margin: 0, fontSize: 14, padding: 8, background: '#f3f4f6' }}>No padding</p>
            </Card>
          </PreviewItem>
          <PreviewItem label="Small">
            <Card shadow="base" padding="small">
              <p style={{ margin: 0, fontSize: 14 }}>Small</p>
            </Card>
          </PreviewItem>
          <PreviewItem label="Medium">
            <Card shadow="base" padding="medium">
              <p style={{ margin: 0, fontSize: 14 }}>Medium</p>
            </Card>
          </PreviewItem>
          <PreviewItem label="Large">
            <Card shadow="base" padding="large">
              <p style={{ margin: 0, fontSize: 14 }}>Large</p>
            </Card>
          </PreviewItem>
        </ComponentPreview>

        <ComponentPreview title="Clickable Card">
          <Card shadow="base" padding="medium" onClick={() => alert('Card clicked!')}>
            <p style={{ margin: 0, fontSize: 14 }}>Click me! This card has an onClick handler.</p>
          </Card>
        </ComponentPreview>

        <ComponentPreview title="StatCard">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, width: '100%' }}>
            <StatCard
              title="Total Financial Institutions"
              value="190"
              trend={{ value: '31%', direction: 'up' }}
              action="View Details"
              onAction={() => alert('View details clicked!')}
              icon={<BankIcon />}
            />
            <StatCard
              title="Active Users"
              value="12,847"
              trend={{ value: '12%', direction: 'up' }}
              action="View Analytics"
              onAction={() => {}}
            />
            <StatCard
              title="Failed Transactions"
              value="23"
              trend={{ value: '5%', direction: 'down' }}
              action="View Report"
              onAction={() => {}}
            />
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Card Props</h2>
        <PropsTable props={CARD_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>StatCard Props</h2>
        <PropsTable props={STAT_PROPS} />
      </section>
    </article>
  );
}
