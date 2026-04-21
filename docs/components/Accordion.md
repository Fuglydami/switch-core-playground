# Accordion

Expandable content sections for organizing information.

## Import

```tsx
// React (web)
import { Accordion, AccordionItem } from '@switch/react';

// React Native
import { Accordion, AccordionItem } from '@switch/react-native';
```

## Usage

```tsx
<Accordion>
  <AccordionItem title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>
```

## Accordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | AccordionItem children |
| `allowMultiple` | `boolean` | `false` | Allow multiple items open |
| `defaultExpandedKeys` | `string[]` | `[]` | Initially expanded items |

## AccordionItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | **required** | Item header |
| `children` | `ReactNode` | **required** | Item content |
| `disabled` | `boolean` | `false` | Disable item |

## Examples

### Single Expansion

```tsx
<Accordion>
  <AccordionItem title="What is your return policy?">
    You can return items within 30 days of purchase.
  </AccordionItem>
  <AccordionItem title="How do I track my order?">
    Use the tracking link in your confirmation email.
  </AccordionItem>
</Accordion>
```

### Multiple Expansion

```tsx
<Accordion allowMultiple>
  <AccordionItem title="Features">Feature list...</AccordionItem>
  <AccordionItem title="Pricing">Pricing details...</AccordionItem>
  <AccordionItem title="FAQ">Common questions...</AccordionItem>
</Accordion>
```

### Default Expanded

```tsx
<Accordion defaultExpandedKeys={['features']}>
  <AccordionItem key="features" title="Features">
    Already expanded on load
  </AccordionItem>
</Accordion>
```

## Accessibility

- Uses `aria-expanded` to indicate state
- Keyboard navigation with Enter/Space to toggle
- Focus management between items
