# Slider

Range input component for selecting numeric values.

## Import

```tsx
// React (web)
import { Slider, RangeSlider } from '@switch/react';

// React Native
import { Slider, RangeSlider } from '@switch/react-native';
```

## Usage

```tsx
// Single value
<Slider
  aria-label="Volume"
  defaultValue={50}
  onChange={(value) => setVolume(value)}
/>

// Range
<RangeSlider
  defaultValue={[20, 80]}
  onChange={([min, max]) => setRange(min, max)}
/>
```

## Slider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | - | Accessibility label |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `value` | `number` | - | Controlled value |
| `defaultValue` | `number` | `0` | Initial value (uncontrolled) |
| `onChange` | `(value: number) => void` | - | Value change handler |
| `onChangeEnd` | `(value: number) => void` | - | Called when interaction ends |
| `disabled` | `boolean` | `false` | Disable slider |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Track/thumb size |
| `showLabels` | `boolean` | `false` | Show min/max labels |
| `formatLabel` | `(value: number) => string` | - | Custom label formatter |

## RangeSlider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `value` | `[number, number]` | - | Controlled range |
| `defaultValue` | `[number, number]` | `[0, 100]` | Initial range |
| `onChange` | `(value: [number, number]) => void` | - | Range change handler |
| `disabled` | `boolean` | `false` | Disable slider |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Track/thumb size |
| `showLabels` | `boolean` | `false` | Show current value labels |
| `formatLabel` | `(value: number) => string` | - | Custom label formatter |

## Examples

### Basic Slider

```tsx
<Slider
  aria-label="Brightness"
  min={0}
  max={100}
  defaultValue={50}
/>
```

### With Labels

```tsx
<Slider
  aria-label="Price"
  min={0}
  max={1000}
  showLabels
  formatLabel={(v) => `$${v}`}
/>
```

### Controlled

```tsx
const [value, setValue] = useState(50);

<Slider
  aria-label="Volume"
  value={value}
  onChange={setValue}
/>
<span>{value}%</span>
```

### Range Selection

```tsx
const [range, setRange] = useState<[number, number]>([200, 800]);

<RangeSlider
  min={0}
  max={1000}
  value={range}
  onChange={setRange}
  showLabels
  formatLabel={(v) => `$${v}`}
/>
<p>Selected: ${range[0]} - ${range[1]}</p>
```

### Sizes

```tsx
<Slider aria-label="Small" size="small" />
<Slider aria-label="Medium" size="medium" />
<Slider aria-label="Large" size="large" />
```

### Custom Step

```tsx
<Slider
  aria-label="Rating"
  min={1}
  max={5}
  step={0.5}
  defaultValue={3}
/>
```

## Accessibility

- Uses `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Keyboard support: Arrow keys adjust value, Home/End jump to min/max
- `aria-label` is required for screen reader context
