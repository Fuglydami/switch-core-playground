# @switch/react

React component library for the Switch Core Design System.

## Installation

```bash
npm install @switch/react
# or
pnpm add @switch/react
# or
yarn add @switch/react
```

## Setup

Import the design tokens CSS in your app's entry point:

```tsx
// app.tsx or index.tsx
import '@switch/react/styles';
```

## Usage

```tsx
import { Button, Input, Card, Modal } from '@switch/react';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary" onPress={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
}
```

## Components

- **Button** - Primary actions and CTAs
- **Input** - Text input with validation states
- **Select** - Dropdown selection
- **Card** - Content container
- **Modal** - Dialog overlay
- **Toast** - Temporary notifications
- **Alert** - Inline feedback
- **Avatar** - User representation
- **Chip** - Tags and filters
- **Tabs** - Content navigation
- **Table** - Data display
- **Accordion** - Expandable sections
- **Menu** - Dropdown actions
- **Tooltip** - Contextual hints
- **Loader** - Loading states
- **EmptyState** - Empty content placeholder
- **Upload** - File upload
- **Checkbox, Radio, Switch** - Form controls
- **SideNav** - Sidebar navigation
- **BottomNav** - Mobile navigation
- **AppBar** - Top app bar
- **Breadcrumb** - Navigation path
- **Header** - Page header
- **Slider** - Range input
- **DatePicker** - Date selection
- **Divider** - Visual separator
- **ListItem** - List entries

## Documentation

View the full documentation and examples at [Storybook](https://switch-core.vercel.app).

## License

MIT
