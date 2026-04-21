# Input

Text input field for collecting user input.

## Import

```tsx
// React (web)
import { Input } from '@switch/react';

// React Native
import { Input } from '@switch/react-native';
```

## Usage

```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  onChangeText={(text) => setEmail(text)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled value |
| `onChangeText` | `(text: string) => void` | - | Change handler |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size |
| `disabled` | `boolean` | `false` | Disable input |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message |
| `successMessage` | `string` | - | Success message |
| `warningMessage` | `string` | - | Warning message |
| `isError` | `boolean` | `false` | Show error state |
| `isSuccess` | `boolean` | `false` | Show success state |
| `isWarning` | `boolean` | `false` | Show warning state |

## Examples

### With Label and Helper Text

```tsx
<Input
  label="Username"
  placeholder="Enter username"
  helperText="Must be at least 3 characters"
/>
```

### Error State

```tsx
<Input
  label="Email"
  value={email}
  isError
  errorMessage="Invalid email address"
/>
```

### Success State

```tsx
<Input
  label="Username"
  value={username}
  isSuccess
  successMessage="Username is available"
/>
```

### Sizes

```tsx
<Input size="small" placeholder="Small" />
<Input size="medium" placeholder="Medium" />
<Input size="large" placeholder="Large" />
```

### Disabled

```tsx
<Input label="Read Only" value="Fixed value" disabled />
```

## Accessibility

- Associates label with input using `aria-labelledby`
- Error/success/warning states announced via `aria-describedby`
- Disabled state prevents focus and interaction
