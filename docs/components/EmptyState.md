# EmptyState

Placeholder component for empty data states.

## Import

```tsx
// React (web)
import { EmptyState } from '@switch/react';

// React Native
import { EmptyState } from '@switch/react-native';
```

## Usage

```tsx
<EmptyState
  title="No results found"
  description="Try adjusting your search or filters."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Main heading |
| `description` | `string` | - | Supporting text |
| `icon` | `ReactNode` | - | Illustration or icon |
| `action` | `ReactNode` | - | Call-to-action button |

## Examples

### Basic

```tsx
<EmptyState title="No items" />
```

### With Description

```tsx
<EmptyState
  title="No notifications"
  description="You're all caught up! Check back later."
/>
```

### With Icon

```tsx
<EmptyState
  icon={<InboxIcon size={48} />}
  title="Inbox empty"
  description="Messages will appear here."
/>
```

### With Action

```tsx
<EmptyState
  title="No projects"
  description="Get started by creating your first project."
  action={
    <Button variant="primary" onPress={createProject}>
      Create Project
    </Button>
  }
/>
```

### Search Results

```tsx
{results.length === 0 ? (
  <EmptyState
    icon={<SearchIcon />}
    title="No results found"
    description={`No matches for "${query}"`}
    action={<Button variant="secondary" onPress={clearSearch}>Clear search</Button>}
  />
) : (
  <ResultsList results={results} />
)}
```

## Accessibility

- Title uses appropriate heading level
- Description provides context for screen readers
