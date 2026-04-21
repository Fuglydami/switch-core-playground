# Switch Component Library

A comprehensive React and React Native component library for building consistent user interfaces.

## Packages

| Package | Description |
|---------|-------------|
| `@switch/react` | React components for web applications |
| `@switch/react-native` | React Native components for mobile applications |
| `@switch/tokens` | Design tokens (colors, typography, spacing) |
| `@switch/icons` | Icon set |

## Installation

```bash
# React (web)
pnpm add @switch/react @switch/tokens

# React Native
pnpm add @switch/react-native @switch/tokens
```

## Components

### Layout & Navigation
- [Accordion](./Accordion.md) - Expandable content sections
- [Card](./Card.md) - Container for related content
- [Divider](./Divider.md) - Visual separator
- [Modal](./Modal.md) - Overlay dialog
- [SideNav](./SideNav.md) - Side navigation menu
- [Tabs](./Tabs.md) - Tabbed content panels

### Forms & Input
- [Button](./Button.md) - Interactive button
- [Checkbox](./Checkbox.md) - Toggle selection
- [DatePicker](./DatePicker.md) - Date selection
- [Input](./Input.md) - Text input field
- [Slider](./Slider.md) - Range selection
- [Upload](./Upload.md) - File upload

### Data Display
- [Avatar](./Avatar.md) - User profile image
- [Chip](./Chip.md) - Compact element for tags/filters
- [Table](./Table.md) - Data grid
- [ListItem](./ListItem.md) - List row

### Feedback
- [Alert](./Alert.md) - Inline notification
- [EmptyState](./EmptyState.md) - Placeholder for empty data
- [Loader](./Loader.md) - Loading indicator
- [Toast](./Toast.md) - Temporary notification
- [Tooltip](./Tooltip.md) - Contextual hint
- [Menu](./Menu.md) - Dropdown menu

## Quick Start

```tsx
import { Button, Input, Card } from '@switch/react';
import '@switch/tokens/css/tokens.css';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## React Native

```tsx
import { Button, Input, Card } from '@switch/react-native';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```
