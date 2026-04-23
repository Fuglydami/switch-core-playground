'use client';

import { Breadcrumb } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Breadcrumb } from 'switch-core-react;

<Breadcrumb
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'category', label: 'Electronics', href: '/products/electronics' },
    { id: 'item', label: 'Laptops' },
  ]}
  onNavigate={(item) => console.log('Navigate to:', item.id)}
/>

// With custom separator
<Breadcrumb
  items={items}
  separator={<span>/</span>}
/>

// With max items (collapsed)
<Breadcrumb
  items={longBreadcrumbList}
  maxItems={3}
/>`;

const PROPS = [
  { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Array of breadcrumb items to display' },
  { name: 'separator', type: 'React.ReactNode', default: 'ChevronIcon', description: 'Custom separator element between items' },
  { name: 'maxItems', type: 'number', default: '—', description: 'Maximum items to show before collapsing with ellipsis' },
  { name: 'onNavigate', type: '(item: BreadcrumbItem) => void', default: '—', description: 'Called when a breadcrumb item is clicked' },
  { name: 'className', type: 'string', default: '—', description: 'Additional CSS class for the nav element' },
];

const ITEM_PROPS = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier for the item' },
  { name: 'label', type: 'string', required: true, description: 'Display text for the breadcrumb' },
  { name: 'href', type: 'string', default: '—', description: 'Navigation URL (renders as anchor)' },
  { name: 'onClick', type: '() => void', default: '—', description: 'Click handler (alternative to href)' },
];

export default function BreadcrumbPage() {
  const basicItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'products', label: 'Products', href: '#' },
    { id: 'electronics', label: 'Electronics' },
  ];

  const deepItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'account', label: 'Account', href: '#' },
    { id: 'settings', label: 'Settings', href: '#' },
    { id: 'security', label: 'Security', href: '#' },
    { id: 'passwords', label: 'Passwords' },
  ];

  const longItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'level1', label: 'Level 1', href: '#' },
    { id: 'level2', label: 'Level 2', href: '#' },
    { id: 'level3', label: 'Level 3', href: '#' },
    { id: 'level4', label: 'Level 4', href: '#' },
    { id: 'current', label: 'Current Page' },
  ];

  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Breadcrumb</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Navigation breadcrumb trail showing the user's current location in the app hierarchy.
          Supports custom separators, collapsible long paths, and keyboard navigation.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Basic Breadcrumb">
          <Breadcrumb
            items={basicItems}
            onNavigate={(item) => alert(`Navigate to: ${item.label}`)}
          />
        </ComponentPreview>

        <ComponentPreview title="Deep Navigation">
          <Breadcrumb
            items={deepItems}
            onNavigate={(item) => alert(`Navigate to: ${item.label}`)}
          />
        </ComponentPreview>

        <ComponentPreview title="Custom Separator">
          <Breadcrumb
            items={basicItems}
            separator={<span style={{ margin: '0 4px', color: '#9ca3af' }}>/</span>}
          />
        </ComponentPreview>

        <ComponentPreview title="Collapsed (maxItems=3)">
          <Breadcrumb
            items={longItems}
            maxItems={3}
            onNavigate={(item) => alert(`Navigate to: ${item.label}`)}
          />
          <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
            Long paths collapse to show first and last items with ellipsis
          </p>
        </ComponentPreview>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Breadcrumb Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>BreadcrumbItem Shape</h2>
        <PropsTable props={ITEM_PROPS} />
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px' }}>Accessibility</h2>
        <ul style={{ color: 'var(--switch-color-text-secondary)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Wrapped in a <code>&lt;nav&gt;</code> element with <code>aria-label="Breadcrumb"</code>.</li>
          <li>Current page has <code>aria-current="page"</code> attribute.</li>
          <li>Separators are marked <code>aria-hidden="true"</code> so screen readers skip them.</li>
          <li>All interactive items are keyboard accessible with visible focus indicators.</li>
        </ul>
      </section>
    </article>
  );
}
