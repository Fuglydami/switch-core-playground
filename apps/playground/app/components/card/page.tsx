import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Card' };

const WEB_CODE = `import { Card, StatCard } from '@switch/react';

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

const RN_CODE = `import { Card, StatCard } from '@switch/react-native';

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
  { name: 'onPress',  type: '() => void',      default: '—',    description: 'Makes card pressable with scale animation (RN uses Reanimated)' },
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
