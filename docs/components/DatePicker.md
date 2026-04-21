# DatePicker

Date selection component with calendar interface.

## Import

```tsx
// React (web)
import { DatePicker } from '@switch/react';

// React Native
import { DatePicker } from '@switch/react-native';
```

## Usage

```tsx
<DatePicker
  label="Start Date"
  value={date}
  onChange={(newDate) => setDate(newDate)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label |
| `value` | `Date` | - | Selected date |
| `onChange` | `(date: Date) => void` | - | Change handler |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `placeholder` | `string` | `'Select date'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable picker |
| `error` | `boolean` | `false` | Show error state |
| `errorMessage` | `string` | - | Error message |
| `format` | `string` | `'MM/DD/YYYY'` | Display format |

## Examples

### Basic

```tsx
const [date, setDate] = useState<Date>();

<DatePicker
  label="Date"
  value={date}
  onChange={setDate}
/>
```

### With Constraints

```tsx
<DatePicker
  label="Appointment"
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
/>
```

### Error State

```tsx
<DatePicker
  label="Due Date"
  value={date}
  onChange={setDate}
  error={!date}
  errorMessage="Date is required"
/>
```

### Custom Format

```tsx
<DatePicker
  label="Birth Date"
  value={date}
  onChange={setDate}
  format="DD/MM/YYYY"
/>
```

## Accessibility

- Calendar is keyboard navigable
- Arrow keys move between days
- Month/year navigation accessible
- Selected date announced to screen readers
