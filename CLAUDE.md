# Claude Code Instructions - Switch Design System

## Figma Design System

**Figma File:** https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core

When given any Figma URL from this file, use the components from `@switch/react` to implement the design.

## Project Overview

This is the **Switch Core Design System** for Interswitch. It contains:
- `packages/react` - React component library (`@switch/react`)
- `apps/playground` - Documentation site

## UI Generation Rules

**ALWAYS use `@switch/react` components when building UI.** Never create custom implementations of:
- Buttons, Inputs, Selects
- Cards, Modals, Alerts, Toasts
- Tables, Tabs, Accordions
- Navigation (SideNav, BottomNav, AppBar, Breadcrumb)
- Any component that exists in the design system

### Component Reference

Read `packages/react/COMPONENT_CATALOG.md` for the complete component API.

### Quick Import

```tsx
import {
  Button,
  Input,
  Select,
  Card,
  Modal,
  Toast,
  ToastProvider,
  useToast,
  Alert,
  Avatar,
  Chip,
  Tabs,
  Table,
  Accordion,
  Menu,
  Tooltip,
  Loader,
  EmptyState,
  Divider,
  HelperText,
  Slider,
  DatePicker,
  Upload,
  Checkbox,
  Radio,
  Switch,
  SideNav,
  BottomNav,
  AppBar,
  Breadcrumb,
  Header,
  ListItem,
} from '@switch/react';
```

## Figma-to-Code Workflow

When given a Figma URL:

1. Use `mcp__claude_ai_Figma__get_design_context` to read the design
2. Identify which Switch components match the design elements
3. Generate code using **only** `@switch/react` components
4. Match the layout, spacing, and structure from the design

### Component Mapping

| Figma Element | Use This Component |
|---------------|-------------------|
| Button (any style) | `<Button>` with appropriate `variant` |
| Text field, Input | `<Input>` |
| Dropdown, Select | `<Select>` |
| Card, Container | `<Card>` |
| Dialog, Popup | `<Modal>` |
| Notification | `<Toast>` or `<Alert>` |
| Profile picture | `<Avatar>` |
| Tag, Badge | `<Chip>` |
| Tab bar | `<Tabs>` |
| Data table | `<Table>` |
| Expandable section | `<Accordion>` |
| Dropdown menu | `<Menu>` |
| Loading state | `<Loader>` |
| Empty view | `<EmptyState>` |
| Sidebar | `<SideNav>` |
| Bottom tab bar | `<BottomNav>` |
| Top bar, Header | `<AppBar>` or `<Header>` |

## Code Style

- Use TypeScript
- Use functional components
- Use CSS Modules for custom layout (not component styling)
- Follow existing patterns in `apps/playground`

## Do NOT

- Create custom button/input/card implementations
- Use inline styles for component styling (only for layout)
- Override design system component styles
- Use third-party UI libraries (no MUI, Chakra, etc.)
