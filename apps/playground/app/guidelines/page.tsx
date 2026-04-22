'use client';

import { Card, Alert } from '@switch/react';
import { CodeBlock } from '../../components/CodeBlock';
import styles from './page.module.css';

export default function GuidelinesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Usage Guidelines</h1>
        <p className={styles.subtitle}>
          Best practices and patterns for using Switch Core components effectively.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Getting Started</h2>
        
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Installation</h3>
          <CodeBlock
            code={`npm install @switch/react
# or
yarn add @switch/react
# or
pnpm add @switch/react`}
            language="bash"
            fileName="terminal"
          />
        </Card>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Setup</h3>
          <p className={styles.cardText}>
            Import the CSS variables in your root layout or global styles:
          </p>
          <CodeBlock
            code={`// app/layout.tsx or _app.tsx
import '@switch/react/styles.css';

// Then import components as needed
import { Button, Input, Modal } from '@switch/react';`}
            language="tsx"
            fileName="layout.tsx"
          />
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Component Patterns</h2>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Forms</h3>
          <p className={styles.cardText}>
            Use the <code>Form</code> component for validated forms, or compose with <code>FormField</code> for custom layouts.
          </p>
          <CodeBlock
            code={`// Quick form with validation
import { Form, validators } from '@switch/react';

<Form
  onSubmit={handleSubmit}
  validationSchema={{
    email: [validators.required(), validators.email()],
    password: [validators.required(), validators.minLength(8)],
  }}
>
  <Form.Field name="email" label="Email" type="email" />
  <Form.Field name="password" label="Password" type="password" />
  <Form.Submit>
    <Button type="submit">Sign In</Button>
  </Form.Submit>
</Form>`}
            language="tsx"
          />
        </Card>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Modals & Dialogs</h3>
          <p className={styles.cardText}>
            For confirmation dialogs, use <code>ConfirmModal</code>. For custom content, use <code>Modal</code>.
          </p>
          <CodeBlock
            code={`// Simple confirmation
<ConfirmModal
  open={showDelete}
  title="Delete Item?"
  message="This action cannot be undone."
  confirmLabel="Delete"
  confirmVariant="danger"
  onConfirm={handleDelete}
  onCancel={() => setShowDelete(false)}
/>

// Custom modal
<Modal open={open} onClose={close} title="Edit Profile">
  <form>
    <Input label="Name" value={name} onChange={setName} />
    <Button onClick={save}>Save</Button>
  </form>
</Modal>`}
            language="tsx"
          />
        </Card>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Toast Notifications</h3>
          <p className={styles.cardText}>
            Wrap your app with <code>ToastProvider</code> and use the <code>useToast</code> hook.
          </p>
          <CodeBlock
            code={`// In your root layout
import { ToastProvider } from '@switch/react';

export default function Layout({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}

// In any component
import { useToast } from '@switch/react';

function SaveButton() {
  const toast = useToast();
  
  const save = async () => {
    await api.save();
    toast.success('Saved successfully!');
  };
  
  return <Button onClick={save}>Save</Button>;
}`}
            language="tsx"
          />
        </Card>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Data Tables</h3>
          <p className={styles.cardText}>
            Use <code>DataTable</code> for searchable, paginated tables with minimal setup.
          </p>
          <CodeBlock
            code={`import { DataTable } from '@switch/react';

const columns = [
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'email', header: 'Email', accessor: 'email' },
  { id: 'status', header: 'Status', accessor: 'status', 
    render: (value) => <Chip variant={value}>{value}</Chip> 
  },
];

<DataTable
  columns={columns}
  data={users}
  searchable
  searchPlaceholder="Search users..."
  searchFields={['name', 'email']}
  paginated
  defaultRowsPerPage={10}
/>`}
            language="tsx"
          />
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessibility</h2>

        <Alert variant="info" className={styles.alert}>
          Switch Core components are built with accessibility in mind. All interactive elements support keyboard navigation and have proper ARIA attributes.
        </Alert>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Keyboard Navigation</h3>
          <ul className={styles.list}>
            <li><strong>Tabs:</strong> Arrow keys to navigate, Enter/Space to select, Home/End for first/last</li>
            <li><strong>Menu:</strong> Arrow Down to open, Escape to close, Arrow keys to navigate</li>
            <li><strong>Modal:</strong> Escape to close, Tab to cycle through focusable elements</li>
            <li><strong>Accordion:</strong> Enter/Space to toggle, focus moves with Tab</li>
          </ul>
        </Card>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Screen Readers</h3>
          <ul className={styles.list}>
            <li>All form inputs have associated labels via <code>aria-labelledby</code></li>
            <li>Error states use <code>aria-invalid</code> and <code>aria-describedby</code></li>
            <li>Loading states use <code>aria-busy</code></li>
            <li>Modals use <code>role="dialog"</code> with <code>aria-labelledby</code></li>
          </ul>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Theming</h2>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>CSS Variables</h3>
          <p className={styles.cardText}>
            Override design tokens by setting CSS custom properties:
          </p>
          <CodeBlock
            code={`:root {
  /* Colors */
  --switch-color-primary: #0066cc;
  --switch-color-primary-hover: #0052a3;
  
  /* Typography */
  --switch-typography-font-family-sans: 'Inter', sans-serif;
  
  /* Spacing */
  --switch-spacing-4: 16px;
  
  /* Border radius */
  --switch-border-radius-md: 8px;
}`}
            language="css"
          />
        </Card>

        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>Dark Mode</h3>
          <p className={styles.cardText}>
            Apply dark theme by adding a class or data attribute and overriding surface colors:
          </p>
          <CodeBlock
            code={`[data-theme="dark"] {
  --switch-color-surface-primary: #1a1a1a;
  --switch-color-surface-grey: #2d2d2d;
  --switch-color-text-primary: #ffffff;
  --switch-color-text-secondary: #a0a0a0;
  --switch-color-border-default: #404040;
}`}
            language="css"
          />
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Best Practices</h2>

        <div className={styles.practices}>
          <Card className={styles.practiceCard}>
            <div className={styles.practiceHeader}>
              <span className={styles.doLabel}>Do</span>
            </div>
            <ul className={styles.practiceList}>
              <li>Use semantic component variants (primary for main actions, danger for destructive)</li>
              <li>Provide descriptive labels for all form inputs</li>
              <li>Use loading states for async operations</li>
              <li>Show appropriate empty states</li>
              <li>Test keyboard navigation</li>
            </ul>
          </Card>

          <Card className={styles.practiceCard}>
            <div className={styles.practiceHeader}>
              <span className={styles.dontLabel}>Don&apos;t</span>
            </div>
            <ul className={styles.practiceList}>
              <li>Override component styles with !important</li>
              <li>Nest interactive elements (button inside button)</li>
              <li>Use color alone to convey meaning</li>
              <li>Disable keyboard navigation</li>
              <li>Remove focus indicators</li>
            </ul>
          </Card>
        </div>
      </section>
    </main>
  );
}
