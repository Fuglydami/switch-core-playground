'use client';

import { Menu, Button } from 'switch-core-react';
import { PlatformBadge } from '@/components/PlatformBadge';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';
import { ComponentPreview } from '@/components/ComponentPreview';

const WEB_CODE = `import { Menu } from 'switch-core-react';

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

const RN_CODE = `import { Menu } from 'switch-core-react-native';
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

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 5V4a1 1 0 00-1-1H4a1 1 0 00-1 1v6a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6 4V3a1 1 0 011-1h2a1 1 0 011 1v1M12 4v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 7l3 3 3-3M3 12v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Preview</h2>

        <ComponentPreview title="Basic Menu">
          <Menu
            trigger={<Button variant="outline">Actions ▾</Button>}
            items={[
              { id: 'edit', label: 'Edit', icon: <EditIcon />, onClick: () => alert('Edit clicked') },
              { id: 'duplicate', label: 'Duplicate', icon: <CopyIcon />, shortcut: '⌘D', onClick: () => alert('Duplicate clicked') },
              { id: 'download', label: 'Download', icon: <DownloadIcon />, onClick: () => alert('Download clicked') },
            ]}
          />
        </ComponentPreview>

        <ComponentPreview title="With Separator & Danger">
          <Menu
            trigger={<Button variant="outline">More ▾</Button>}
            items={[
              { id: 'edit', label: 'Edit', icon: <EditIcon />, onClick: () => {} },
              { id: 'duplicate', label: 'Duplicate', onClick: () => {} },
              { id: 'sep', label: 'separator' },
              { id: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true, onClick: () => alert('Delete clicked') },
            ]}
          />
        </ComponentPreview>

        <ComponentPreview title="With Nested Submenu (Web)">
          <Menu
            trigger={<Button variant="outline">Options ▾</Button>}
            items={[
              { id: 'view', label: 'View', onClick: () => {} },
              {
                id: 'export',
                label: 'Export as...',
                children: [
                  { id: 'pdf', label: 'PDF', onClick: () => alert('Export as PDF') },
                  { id: 'csv', label: 'CSV', onClick: () => alert('Export as CSV') },
                  { id: 'json', label: 'JSON', onClick: () => alert('Export as JSON') },
                ],
              },
              { id: 'sep', label: 'separator' },
              { id: 'settings', label: 'Settings', onClick: () => {} },
            ]}
          />
        </ComponentPreview>

        <ComponentPreview title="Placements">
          <Menu
            trigger={<Button size="small">Bottom Start ▾</Button>}
            placement="bottom-start"
            items={[
              { id: '1', label: 'Item 1', onClick: () => {} },
              { id: '2', label: 'Item 2', onClick: () => {} },
            ]}
          />
          <Menu
            trigger={<Button size="small">Bottom End ▾</Button>}
            placement="bottom-end"
            items={[
              { id: '1', label: 'Item 1', onClick: () => {} },
              { id: '2', label: 'Item 2', onClick: () => {} },
            ]}
          />
        </ComponentPreview>

        <ComponentPreview title="With Disabled Items">
          <Menu
            trigger={<Button variant="outline">Edit ▾</Button>}
            items={[
              { id: 'undo', label: 'Undo', shortcut: '⌘Z', disabled: true, onClick: () => {} },
              { id: 'redo', label: 'Redo', shortcut: '⌘⇧Z', disabled: true, onClick: () => {} },
              { id: 'sep', label: 'separator' },
              { id: 'cut', label: 'Cut', shortcut: '⌘X', onClick: () => {} },
              { id: 'copy', label: 'Copy', shortcut: '⌘C', onClick: () => {} },
              { id: 'paste', label: 'Paste', shortcut: '⌘V', onClick: () => {} },
            ]}
          />
        </ComponentPreview>
      </section>

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
