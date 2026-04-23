'use client';

import { Divider } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Divider } from 'switch-core-react';

// Plain horizontal rule
<Divider />

// With centred label (e.g. section headers, "Today")
<Divider label="Today" />
<Divider label="Notifications" />

// Vertical (between inline items)
<div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
  <span>Content</span>
  <Divider orientation="vertical" />
  <span>Content</span>
</div>`;

const RN_CODE = `import { Divider } from 'switch-core-react-native';
import { View, Text } from 'react-native';

// Plain horizontal rule
<Divider />

// With centred label
<Divider label="Today" />
<Divider label="Notifications" />

// Vertical (between inline items)
<View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
  <Text>Content</Text>
  <Divider orientation="vertical" />
  <Text>Content</Text>
</View>`;

const PROPS = [
  { name: 'label',       type: 'React.ReactNode',               default: '—',           description: 'Centred label — renders a line–text–line layout when provided' },
  { name: 'orientation', type: '"horizontal" | "vertical"',     default: '"horizontal"', description: 'Direction of the divider line' },
  { name: 'className',   type: 'string',                        default: '—',           description: 'Extra class on the root element' },
];

export default function DividerPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Divider</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Content separator — horizontal rule, labelled section divider (line–text–line), or vertical separator for inline layouts.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Horizontal (Default)">
          <div style={{ width: '100%' }}>
            <Divider />
          </div>
        </ComponentPreview>

        <ComponentPreview title="With Label">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <Divider label="Today" />
            <Divider label="Notifications" />
            <Divider label="or continue with" />
          </div>
        </ComponentPreview>

        <ComponentPreview title="Vertical">
          <div style={{ display: 'flex', alignItems: 'center', height: 40, gap: 16 }}>
            <span style={{ color: '#374151' }}>Option A</span>
            <Divider orientation="vertical" />
            <span style={{ color: '#374151' }}>Option B</span>
            <Divider orientation="vertical" />
            <span style={{ color: '#374151' }}>Option C</span>
          </div>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </article>
  );
}
