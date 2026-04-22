'use client';

import styles from './page.module.css';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: 'added' | 'changed' | 'fixed' | 'deprecated' | 'removed';
    description: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '0.2.0',
    date: '2026-04-22',
    changes: [
      { type: 'added', description: 'Breadcrumb navigation component' },
      { type: 'added', description: 'BottomNav component for mobile navigation' },
      { type: 'added', description: 'AppBar component for top navigation' },
      { type: 'added', description: 'Header component with title, subtitle, and actions' },
      { type: 'added', description: 'SearchInput composite component' },
      { type: 'added', description: 'ConfirmModal for confirmation dialogs' },
      { type: 'added', description: 'FormField with label, input, and helper text' },
      { type: 'added', description: 'DataTable with search, pagination, and empty states' },
      { type: 'added', description: 'PageHeader for page titles with breadcrumbs and actions' },
      { type: 'added', description: 'Form component with built-in validation' },
      { type: 'added', description: 'Storybook documentation for all composite components' },
      { type: 'fixed', description: 'Menu trigger now uses button element for keyboard accessibility' },
      { type: 'fixed', description: 'Avatar image border-radius now correctly rounds images' },
      { type: 'changed', description: 'Reduced border-radius on feedback components (Alert, Toast)' },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-04-15',
    changes: [
      { type: 'added', description: 'Initial release of Switch Core Design System' },
      { type: 'added', description: 'Button component with variants: primary, secondary, outline, ghost, danger' },
      { type: 'added', description: 'Input component with PIN input mode support' },
      { type: 'added', description: 'Modal component using native dialog element' },
      { type: 'added', description: 'Toast notification system with ToastProvider' },
      { type: 'added', description: 'Tabs component with keyboard navigation' },
      { type: 'added', description: 'Table component with sorting and selection' },
      { type: 'added', description: 'Accordion component with multiple/single mode' },
      { type: 'added', description: 'Menu component with nested submenus' },
      { type: 'added', description: 'Tooltip component with placement options' },
      { type: 'added', description: 'Avatar component with image, initials, and icon modes' },
      { type: 'added', description: 'Alert component with status variants' },
      { type: 'added', description: 'Chip component for tags and badges' },
      { type: 'added', description: 'Card component with sections' },
      { type: 'added', description: 'Loader component with spinner and skeleton modes' },
      { type: 'added', description: 'DatePicker with calendar popup' },
      { type: 'added', description: 'Slider component for range selection' },
      { type: 'added', description: 'Upload component with drag-and-drop' },
      { type: 'added', description: 'Checkbox, Radio, and Switch controls' },
      { type: 'added', description: 'SideNav for sidebar navigation' },
      { type: 'added', description: 'EmptyState component for empty views' },
      { type: 'added', description: 'HelperText and Divider utility components' },
      { type: 'added', description: 'ListItem component for lists' },
      { type: 'added', description: 'React Native package with core components' },
      { type: 'added', description: 'Design tokens CSS variables' },
      { type: 'added', description: 'Playground documentation site' },
    ],
  },
];

const typeColors = {
  added: { bg: '#dcfce7', color: '#166534', label: 'Added' },
  changed: { bg: '#fef3c7', color: '#92400e', label: 'Changed' },
  fixed: { bg: '#dbeafe', color: '#1e40af', label: 'Fixed' },
  deprecated: { bg: '#fef9c3', color: '#854d0e', label: 'Deprecated' },
  removed: { bg: '#fee2e2', color: '#991b1b', label: 'Removed' },
};

export default function ChangelogPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Changelog</h1>
        <p className={styles.subtitle}>
          All notable changes to Switch Core Design System will be documented here.
        </p>
      </div>

      <div className={styles.timeline}>
        {changelog.map((entry, index) => (
          <article key={entry.version} className={styles.entry}>
            <div className={styles.versionHeader}>
              <h2 className={styles.version}>{entry.version}</h2>
              <time className={styles.date}>{entry.date}</time>
            </div>

            <ul className={styles.changeList}>
              {entry.changes.map((change, i) => {
                const typeStyle = typeColors[change.type];
                return (
                  <li key={i} className={styles.changeItem}>
                    <span
                      className={styles.changeType}
                      style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
                    >
                      {typeStyle.label}
                    </span>
                    <span className={styles.changeDescription}>{change.description}</span>
                  </li>
                );
              })}
            </ul>

            {index < changelog.length - 1 && <hr className={styles.divider} />}
          </article>
        ))}
      </div>

      <section className={styles.parity}>
        <h2 className={styles.parityTitle}>React Native Parity</h2>
        <p className={styles.parityDescription}>
          The following components are available in <code>@switch/react</code> but not yet in <code>@switch/react-native</code>:
        </p>
        <ul className={styles.parityList}>
          <li><strong>Navigation:</strong> Breadcrumb, BottomNav, Header, AppBar</li>
          <li><strong>Composite:</strong> SearchInput, ConfirmModal, FormField, DataTable, PageHeader, Form</li>
        </ul>
        <p className={styles.parityNote}>
          These components are planned for future React Native releases.
        </p>
      </section>
    </main>
  );
}
