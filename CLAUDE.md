# Claude Code Instructions - Switch Design System

## Project Overview

This is the **Switch Core Design System** for Interswitch. It contains:
- `packages/react` - React component library (`switch-core-react`)
- `apps/playground` - Documentation site

## For Vibecoders

**See `DESIGN_SYSTEM.md`** for complete component reference and examples.
Copy that file to your project root and start prompting!

## Figma Integration

**Figma File:** https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core

When given any Figma URL:
1. Use `mcp__claude_ai_Figma__get_design_context` to read the design
2. Generate code using **only** `switch-core-react` components
3. Match the layout, spacing, and structure from the design

## The Golden Rule

**ALWAYS use `switch-core-react` components when building UI.** Never create custom implementations.

```tsx
import {
  // Navigation
  AppBar, SideNav, BottomNav, Header, Breadcrumb,
  // Content
  Card, Accordion, Tabs, Table, ListItem, Divider, EmptyState,
  // Forms
  Button, Input, Select, Checkbox, Radio, Switch, Slider, DatePicker, Upload,
  // Feedback
  Modal, Toast, ToastProvider, useToast, Alert, Loader, HelperText,
  // Display
  Avatar, Chip, Tooltip, Menu,
} from 'switch-core-react';
```

## Component Mapping (Figma → Code)

| Figma Element | Component |
|---------------|-----------|
| Button | `<Button variant="primary\|secondary\|outline">` |
| Input/TextField | `<Input>` |
| Dropdown | `<Select>` |
| Card/Container | `<Card>` |
| Dialog/Popup | `<Modal>` |
| Notification | `<Toast>` / `<Alert>` |
| Avatar | `<Avatar>` |
| Tag/Badge | `<Chip>` |
| Tabs | `<Tabs>` |
| Table | `<Table>` |
| Accordion | `<Accordion>` |
| Menu | `<Menu>` |
| Sidebar | `<SideNav>` |
| Bottom Nav | `<BottomNav>` |
| Top Bar | `<AppBar>` / `<Header>` |

## Code Style

- TypeScript, functional components
- CSS Modules for layout only
- Follow patterns in `apps/playground`

## Do NOT

- Create custom button/input/card implementations
- Override design system component styles
- Use third-party UI libraries (MUI, Chakra, etc.)

## Resources

- **Storybook:** https://main--69e7740643766d793dd9a5ca.chromatic.com
- **Playground:** https://switch-core-playground.vercel.app
- **Full API:** `packages/react/COMPONENT_CATALOG.md`
