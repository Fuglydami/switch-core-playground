import type { Metadata } from 'next';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

export const metadata: Metadata = { title: 'Menu' };

const WEB_CODE = `import { Menu } from '@switch/react';

<Menu
  trigger={<button>Actions ▾</button>}
  items={[
    { id: 'edit',   label: 'Edit',   icon: <EditIcon />,   onClick: () => handleEdit() },
    { id: 'dup',    label: 'Duplicate', shortcut: '⌘D',   onClick: () => handleDup() },
    { id: 'sep',    label: 'separator' },
    { id: 'delete', label: 'Delete', danger: true,          onClick: () => handleDelete() },
  ]}
/>

// With nested submenu
<Menu
  trigger={<button>Menu ▾</button>}
  items={[
    { id: 'item-1', label: 'Item 1', onClick: () => {} },
    {
      id: 'item-2', label: 'Item 2',
      children: [
        { id: 'sub-1', label: 'Sub item 1', onClick: () => {} },
        { id: 'sub-2', label: 'Sub item 2', onClick: () => {} },
      ],
    },
  ]}
/>`;

const RN_CODE = `import { Menu } from '@switch/react-native';
import { Text } from 'react-native';

<Menu
  trigger={<Text>Actions ▾</Text>}
  items={[
    { id: 'edit',   label: 'Edit',   icon: <EditIcon />,   onPress: () => handleEdit() },
    { id: 'separator', label: 'separator' },
    { id: 'delete', label: 'Delete', danger: true,         onPress: () => handleDelete() },
  ]}
  onOpenChange={(open) => console.log('Menu open:', open)}
/>

// Note: RN Menu uses Modal-based dropdown, positioned below the trigger.
// Nested submenus (children) are not supported in RN v1.0.`;

const MENU_PROPS = [
  { name: 'items',     type: 'MenuItem[]',                                          required: true,  description: 'Menu item definitions' },
  { name: 'trigger',   type: 'React.ReactNode',                                     required: true,  description: 'Element that opens the menu on click' },
  { name: 'placement', type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"', default: '"bottom-start"', description: 'Menu position relative to trigger' },
];

const ITEM_PROPS = [
  { name: 'id',       type: 'string',          required: true,  description: 'Unique identifier. Use "separator" for a divider rule.' },
  { name: 'label',    type: 'string',          required: true,  description: 'Displayed text' },
  { name: 'icon',     type: 'React.ReactNode', default: '—',    description: 'Optional leading icon' },
  { name: 'shortcut', type: 'string',          default: '—',    description: 'Keyboard shortcut label (display only)' },
  { name: 'disabled', type: 'boolean',         default: 'false', description: 'Prevents selection' },
  { name: 'danger',   type: 'boolean',         default: 'false', description: 'Renders item in error/red colour' },
  { name: 'children', type: 'MenuItem[]',      default: '—',    description: 'Nested sub-menu items (shown on hover/focus)' },
  { name: 'onClick',  type: '() => void',      default: '—',    description: 'Called when item is selected (ignored when children present)' },
];

export default function MenuPage() {
  return (
    <article>
      <div style={{ marginBottom: 32 }}>
        <PlatformBadge platforms={['web', 'ios', 'android']} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>Menu</h1>
        <p style={{ color: 'var(--switch-color-text-secondary)', fontSize: 16, margin: 0 }}>
          Floating action menu anchored to a trigger element. Supports icons, keyboard shortcuts, danger state, separator rules, and one-level nested sub-menus. Closes on outside click or Escape.
        </p>
      </div>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Code</h2>
        <CodeTabs web={WEB_CODE} reactNative={RN_CODE} />
      </section>
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Menu Props</h2>
        <PropsTable props={MENU_PROPS} />
      </section>
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>MenuItem Shape</h2>
        <PropsTable props={ITEM_PROPS} />
      </section>
    </article>
  );
}
