# Switch Core — Playground Design System

> **Internal shared design system documentation and component library for the Switch frontend team.**
> This document is the authoritative project specification for the AI agent responsible for scaffolding, building, and maintaining the Playground monorepo.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Design System Source](#design-system-source)
3. [Tech Stack & Versions](#tech-stack--versions)
4. [Monorepo Architecture](#monorepo-architecture)
5. [Package Specifications](#package-specifications)
   - [@switch/tokens](#switchtoken)
   - [@switch/types](#switchtypes)
   - [@switch/react](#switchreact)
   - [@switch/react-native](#switchreact-native)
   - [playground (docs site)](#playground-nextjs-docs-app)
6. [Token System](#token-system)
7. [Component Specifications](#component-specifications)
8. [Documentation Site (Playground)](#documentation-site-playground)
9. [Testing Strategy](#testing-strategy)
10. [Figma Code Connect](#figma-code-connect)
11. [CI/CD Pipeline](#cicd-pipeline)
12. [Developer Workflow](#developer-workflow)
13. [Naming Conventions](#naming-conventions)
14. [Bootstrap Commands](#bootstrap-commands)
15. [Agent Task Checklist](#agent-task-checklist)

---

## Project Overview

**Project Name:** Switch Core Playground
**Type:** Internal design system monorepo
**Team:** 10 engineers (React web + React Native mobile developers)
**Figma File:** [Switch Core Design System](https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/%F0%9F%9A%A7-Switch-Core?node-id=0-1)
**Status:** v1.0 — In active development

### Goals

- Provide a single source of truth for UI components, design tokens, and usage guidelines across **web and mobile**
- Enable the full frontend team to ship consistent UI faster on both platforms
- Bridge Figma design and production code via Figma Code Connect (web + mobile code snippets)
- Share design tokens between `@switch/react` (web) and `@switch/react-native` (mobile) from one token pipeline
- Automate visual regression testing with Chromatic on every PR
- Surface web and mobile component usage side-by-side in the Playground docs site

### Non-Goals

- This is NOT a public npm package — internal use only
- This does NOT replace Figma — it supplements it with living code documentation
- This does NOT support Angular or other non-React frameworks in v1.0
- The RN package does NOT use React Native Web — it targets iOS and Android natively via Expo

### Platform Strategy

```
@switch/tokens  ──▶  @switch/react          (web — React 19 + CSS Modules)
             ╚────▶  @switch/react-native   (mobile — React Native 0.84 + Expo 55)

@switch/types   ──▶  both packages          (shared TypeScript interfaces — prop API parity)
```

Both packages implement the **same component API** (identical prop names and variant values) but use platform-appropriate primitives underneath. Web uses `div`, `className`, and CSS custom properties. Mobile uses `View`, `Text`, `StyleSheet`, and unitless token values. This means the Playground docs can show a single prop table and two code tabs — one per platform.

---

## Design System Source

The Switch Core Figma file contains the following components to implement on both platforms:

### Color Palette (extracted)

| Token Name    | Hex Value | Usage                         |
| ------------- | --------- | ----------------------------- |
| `pryBlue`     | `#00425F` | Primary brand, CTAs           |
| `popBlue`     | `#00B8DE` | Interactive, highlights       |
| `primaryRed`  | `#EE312A` | Error states, destructive     |
| `primaryGrey` | `#EAECEF` | Backgrounds, neutral surfaces |
| `white`       | `#FFFFFF` | Base backgrounds              |

### Component Inventory

| Component   | Figma Node Pattern                                           | Web Priority | RN Priority |
| ----------- | ------------------------------------------------------------ | ------------ | ----------- |
| Button      | `rect/{size}/{color}/{variant}/{state}`                      | P0           | P0          |
| Input       | `.master / input / select / ...`                             | P0           | P0          |
| Modal       | `.master / modal-title`                                      | P0           | P0          |
| Toast       | `mobile / icon + description`                                | P0           | P0          |
| Tabs        | `default`, `label + icon-leading`, `pill + label`            | P1           | P1          |
| List Item   | `label`, `label + avatar`, `label + icon`, `label + control` | P1           | P1          |
| Tooltip     | `master` (with directional pointers)                         | P1           | P2          |
| Date Picker | `scroll-selector`                                            | P2           | P2          |

> **Agent note:** Tooltip on RN is P2 because native mobile UX typically replaces tooltips with bottom sheets or inline helper text. Implement a `HelperText` component for RN instead of Tooltip.

---

## Tech Stack & Versions

> All versions pinned as of April 2026. The agent must use these exact versions when initialising packages.

### Shared / Monorepo

| Tool           | Version  | Purpose                                   |
| -------------- | -------- | ----------------------------------------- |
| **pnpm**       | `^10.x`  | Package manager + workspace orchestration |
| **Turborepo**  | `^2.9.4` | Monorepo build system with task caching   |
| **Node.js**    | `>=20.x` | Runtime (LTS)                             |
| **TypeScript** | `^5.x`   | Type safety across all packages           |
| **ESLint**     | `^9.x`   | Linting (flat config)                     |
| **Prettier**   | `^3.x`   | Code formatting                           |

### Web (`@switch/react` + `playground`)

| Tool                       | Version  | Purpose                              |
| -------------------------- | -------- | ------------------------------------ |
| **React**                  | `^19.x`  | Web component framework              |
| **Style Dictionary**       | `^5.4.0` | Design token transformation pipeline |
| **Storybook**              | `^8.x`   | Component workshop + visual docs     |
| **Next.js**                | `^15.x`  | Playground documentation site        |
| **MDX**                    | `^3.x`   | Markdown + JSX for docs pages        |
| **Chromatic**              | `^12.x`  | Visual regression testing + review   |
| **Figma Code Connect**     | `^1.x`   | Bridge Figma components to code      |
| **Vitest**                 | `^3.x`   | Unit testing                         |
| **@testing-library/react** | `^16.x`  | Component interaction testing        |
| **Tailwind CSS**           | `^4.x`   | Utility classes for docs site only   |

### Mobile (`@switch/react-native`)

| Tool                               | Version   | Purpose                                       |
| ---------------------------------- | --------- | --------------------------------------------- |
| **React Native**                   | `^0.84.x` | Mobile framework (New Architecture — default) |
| **Expo SDK**                       | `^55.x`   | Managed workflow + build tooling (EAS)        |
| **React** (peer)                   | `^19.x`   | Shared with web — same React version          |
| **react-native-reanimated**        | `^4.3.0`  | Animation engine (New Architecture only)      |
| **react-native-gesture-handler**   | `^2.28.0` | Gesture recognition                           |
| **react-native-safe-area-context** | `^5.6.0`  | Safe area insets (notch, home indicator)      |
| **react-native-screens**           | `^4.x`    | Native navigation screens                     |
| **@testing-library/react-native**  | `^13.x`   | Component testing for RN                      |
| **jest-expo**                      | `^55.x`   | Jest preset for Expo projects                 |

---

## Monorepo Architecture

```
switch-core-playground/
├── .github/
│   └── workflows/
│       ├── ci.yml                     # Lint, test, build on every PR
│       └── chromatic.yml              # Visual regression on every PR
│
├── apps/
│   └── playground/                    # Next.js 15 — internal docs site
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── (docs)/
│       │       ├── tokens/
│       │       ├── components/
│       │       │   ├── button/        # page.mdx — shows web + RN tabs
│       │       │   ├── input/
│       │       │   ├── modal/
│       │       │   ├── toast/
│       │       │   ├── tabs/
│       │       │   ├── list-item/
│       │       │   ├── tooltip/
│       │       │   └── date-picker/
│       │       └── guidelines/
│       ├── components/                # Docs-only UI
│       │   ├── CodeTabs.tsx           # Web / React Native code switcher
│       │   ├── PropTable.tsx          # Auto-generated from TS interface
│       │   ├── LiveDemo.tsx           # Iframe embed of Storybook story
│       │   └── PlatformBadge.tsx      # "Web" / "iOS" / "Android" badges
│       ├── public/
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── tokens/                        # @switch/tokens — design token pipeline
│   │   ├── src/tokens/
│   │   │   ├── color.json
│   │   │   ├── spacing.json
│   │   │   ├── typography.json
│   │   │   ├── border-radius.json
│   │   │   └── shadow.json
│   │   ├── sd.config.ts               # Style Dictionary 5 config
│   │   ├── dist/
│   │   │   ├── css/                   # → CSS custom properties (web)
│   │   │   ├── js/                    # → JS/TS token objects (web)
│   │   │   ├── tailwind/              # → Tailwind v4 theme extension (docs)
│   │   │   └── rn/                    # → Unitless JS tokens (React Native) ← NEW
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                         # @switch/types — shared TS interfaces ← NEW
│   │   ├── src/
│   │   │   ├── button.ts
│   │   │   ├── input.ts
│   │   │   ├── modal.ts
│   │   │   ├── toast.ts
│   │   │   ├── tabs.ts
│   │   │   ├── list-item.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── react/                         # @switch/react — web component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.module.css
│   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   ├── Button.figma.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Toast/
│   │   │   │   ├── Tabs/
│   │   │   │   ├── ListItem/
│   │   │   │   ├── Tooltip/
│   │   │   │   └── DatePicker/
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── .storybook/
│   │   │   ├── main.ts
│   │   │   └── preview.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── react-native/                  # @switch/react-native — mobile library ← NEW
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.styles.ts   # StyleSheet.create(...)
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   ├── Button.figma.tsx   # Code Connect — RN snippet
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/             # Uses RN Modal primitive
│   │   │   │   ├── Toast/             # Uses Reanimated entering/exiting
│   │   │   │   ├── Tabs/
│   │   │   │   ├── ListItem/
│   │   │   │   ├── HelperText/        # RN-only — substitute for Tooltip
│   │   │   │   └── DatePicker/        # Uses ScrollView + FlatList
│   │   │   ├── hooks/
│   │   │   │   └── useToast.ts
│   │   │   ├── utils/
│   │   │   │   └── tokens.ts          # Re-exports @switch/tokens/rn
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── icons/                         # @switch/icons — SVG (web) + RN wrappers
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── tsconfig/                      # @switch/tsconfig — shared TS base configs
│       ├── base.json
│       ├── react-library.json
│       ├── react-native-library.json  # ← RN-specific TS config
│       └── nextjs.json
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── .eslintrc.config.js
├── .prettierrc
└── README.md
```

### Key architectural decisions

- **`@switch/types`** holds all shared TypeScript interfaces. Both `@switch/react` and `@switch/react-native` import from it, guaranteeing their prop APIs stay in sync automatically.
- **`@switch/tokens/rn`** is a Style Dictionary output target that strips `px` units and outputs unitless numbers required by React Native's `StyleSheet`.
- **No React Native Web** — the RN package targets real native iOS and Android. It does not render in a browser.
- **Expo managed workflow** — the RN package is Expo-compatible. Consumers bootstrap their app with `npx create-expo-app`.
- **New Architecture only** — `react-native-reanimated` v4 and `react-native-gesture-handler` v2.28+ require the New Architecture (`newArchEnabled: true`). The legacy bridge is not supported.

---

## Package Specifications

### `@switch/tokens`

**Purpose:** Single source of truth for all design tokens. Consumed by `@switch/react`, `@switch/react-native`, and the `playground` docs site.

**Output targets:**

| Target     | Output path              | Format                        | Consumer               |
| ---------- | ------------------------ | ----------------------------- | ---------------------- |
| `css`      | `dist/css/variables.css` | CSS custom properties         | `@switch/react`        |
| `js`       | `dist/js/tokens.js`      | ES module JS object (with px) | `@switch/react`        |
| `tailwind` | `dist/tailwind/theme.js` | Tailwind v4 theme object      | `playground`           |
| `rn`       | `dist/rn/tokens.js`      | Unitless JS numbers           | `@switch/react-native` |

**`sd.config.ts`:**

```typescript
import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';

const config: Config = {
  source: ['src/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'switch',
      buildPath: 'dist/css/',
      files: [{ destination: 'variables.css', format: 'css/variables' }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }],
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: 'dist/tailwind/',
      files: [{ destination: 'theme.js', format: 'javascript/es6' }],
    },
    rn: {
      transformGroup: 'react-native', // strips 'px', outputs bare numbers
      buildPath: 'dist/rn/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }],
    },
  },
};

export default config;
```

**`package.json` exports:**

```json
{
  "name": "@switch/tokens",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    "./css": "./dist/css/variables.css",
    "./js": "./dist/js/tokens.js",
    "./tailwind": "./dist/tailwind/theme.js",
    "./rn": "./dist/rn/tokens.js"
  },
  "scripts": {
    "build": "style-dictionary build --config sd.config.ts",
    "dev": "style-dictionary build --config sd.config.ts --watch"
  },
  "devDependencies": {
    "style-dictionary": "^5.4.0",
    "typescript": "^5.0.0"
  }
}
```

---

### `@switch/types`

**Purpose:** Shared TypeScript interfaces for every component. Imported by both `@switch/react` and `@switch/react-native` to guarantee prop API parity across platforms.

**Rule:** All interfaces must use only types that are valid in both React DOM and React Native — `string`, `number`, `boolean`, `() => void`, `React.ReactNode`. No web-only types (`React.HTMLAttributes`, `CSSProperties`) and no RN-only types (`ViewStyle`, `TextStyle`).

**`onPress` convention:** All shared interfaces use `onPress` (RN convention). The `@switch/react` web components map `onPress → onClick` internally. This unifies the API so web and mobile consumers write identical code.

**`src/button.ts`:**

```typescript
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonShape = 'rectangular' | 'pill';
export type ButtonColor = 'popBlue' | 'activeBlue' | 'primaryBlue' | 'monochrome';

export interface ButtonBaseProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  colorScheme?: ButtonColor;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}
```

**`package.json`:**

```json
{
  "name": "@switch/types",
  "version": "0.1.0",
  "type": "module",
  "main": "./src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0"
  }
}
```

---

### `@switch/react`

**Purpose:** React 19 web component library. Implements Switch Core components using HTML elements, CSS Modules, and `@switch/tokens/css`.

**Key rules:**

1. Every component imports its base interface from `@switch/types` and extends it with web-specific additions
2. Every component must have `.tsx`, `.module.css`, `.stories.tsx`, `.test.tsx`, `.figma.tsx`, and `index.ts`
3. Styling via CSS Modules + `@switch/tokens/css` — no Tailwind inside components
4. All interactive components must be keyboard accessible (WCAG 2.1 AA)
5. All components forward refs where appropriate

**`package.json`:**

```json
{
  "name": "@switch/react",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" }
  },
  "scripts": {
    "build": "tsc --project tsconfig.build.json",
    "dev": "tsc --project tsconfig.build.json --watch",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "vitest run",
    "test:watch": "vitest",
    "chromatic": "chromatic --exit-zero-on-changes"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "@switch/tokens": "workspace:*",
    "@switch/types": "workspace:*"
  },
  "devDependencies": {
    "@storybook/react": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-interactions": "^8.0.0",
    "@storybook/addon-a11y": "^8.0.0",
    "@storybook/test": "^8.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@figma/code-connect": "^1.0.0",
    "chromatic": "^12.0.0",
    "storybook": "^8.0.0",
    "vitest": "^3.0.0",
    "jsdom": "^25.0.0",
    "typescript": "^5.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

---

### `@switch/react-native`

**Purpose:** React Native component library for iOS and Android. Implements the same Switch Core components using RN primitives (`View`, `Text`, `Pressable`, `StyleSheet`) and `@switch/tokens/rn` for unitless token values.

**Key rules:**

1. Every component imports its base interface from `@switch/types` — no prop API divergence from web
2. Use `Pressable` for all interactive elements — not `TouchableOpacity` (deprecated in New Architecture)
3. Use `StyleSheet.create()` — no inline style objects in JSX render
4. Use `react-native-reanimated` v4 for all animations — do not use the core `Animated` API
5. New Architecture (`newArchEnabled: true`) is required — legacy bridge is not supported
6. Every component has `.tsx`, `.styles.ts`, `.test.tsx`, `.figma.tsx`, and `index.ts`
7. Wrap consumer app root in `GestureHandlerRootView` + `SafeAreaProvider` — document this requirement clearly in the Playground

**`package.json`:**

```json
{
  "name": "@switch/react-native",
  "version": "0.1.0",
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": { "import": "./src/index.ts", "types": "./src/index.ts" }
  },
  "scripts": {
    "build": "tsc --project tsconfig.json",
    "test": "jest --config jest.config.ts",
    "test:watch": "jest --config jest.config.ts --watch",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "peerDependencies": {
    "expo": "^55.0.0",
    "react": "^19.0.0",
    "react-native": "^0.84.0",
    "react-native-gesture-handler": "^2.28.0",
    "react-native-reanimated": "^4.3.0",
    "react-native-safe-area-context": "^5.6.0"
  },
  "dependencies": {
    "@switch/tokens": "workspace:*",
    "@switch/types": "workspace:*"
  },
  "devDependencies": {
    "@testing-library/react-native": "^13.0.0",
    "@figma/code-connect": "^1.0.0",
    "@types/react": "^19.0.0",
    "expo": "^55.0.0",
    "react": "^19.0.0",
    "react-native": "^0.84.0",
    "jest": "^29.0.0",
    "jest-expo": "^55.0.0",
    "react-native-reanimated": "^4.3.0",
    "react-native-gesture-handler": "^2.28.0",
    "react-native-safe-area-context": "^5.6.0",
    "typescript": "^5.0.0"
  }
}
```

**`jest.config.ts`:**

```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  setupFilesAfterFramework: ['@testing-library/react-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@switch/.*)',
  ],
};

export default config;
```

#### Button — RN implementation pattern

**`Button.styles.ts`:**

```typescript
import { StyleSheet } from 'react-native';
import tokens from '@switch/tokens/rn';

export const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadius.md, // e.g. 8 — unitless
    flexDirection: 'row',
    gap: tokens.spacing[2], // e.g. 8 — unitless
  },
  small: {
    paddingVertical: tokens.spacing[2], // 8
    paddingHorizontal: tokens.spacing[3], // 12
    minHeight: 36,
  },
  large: {
    paddingVertical: tokens.spacing[3], // 12
    paddingHorizontal: tokens.spacing[4], // 16
    minHeight: 48,
  },
  primaryActiveBlue: {
    backgroundColor: tokens.color.brand.pryBlue,
  },
  secondaryActiveBlue: {
    backgroundColor: 'rgba(0,184,222,0.12)',
  },
  tertiaryActiveBlue: {
    backgroundColor: 'transparent',
  },
  tertiaryMonochrome: {
    backgroundColor: 'transparent',
  },
  disabled: { opacity: 0.4 },
  label: {
    fontFamily: tokens.typography.fontFamily.sans,
    fontWeight: '600',
    color: tokens.color.brand.white,
  },
  labelDark: { color: tokens.color.brand.pryBlue },
});
```

**`Button.tsx`:**

```typescript
import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ButtonBaseProps } from '@switch/types';
import { styles } from './Button.styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ButtonProps extends ButtonBaseProps {
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<typeof Pressable, ButtonProps>(
  (
    {
      variant = 'primary',
      colorScheme = 'activeBlue',
      size = 'large',
      isLoading = false,
      disabled = false,
      onPress,
      children,
      leftIcon,
      rightIcon,
    },
    ref
  ) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const variantKey =
      `${variant}${colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}` as keyof typeof styles;
    const isLabelDark = variant !== 'primary';

    return (
      <AnimatedPressable
        ref={ref as any}
        style={[
          styles.base,
          styles[size],
          styles[variantKey],
          disabled && styles.disabled,
          animatedStyle,
        ]}
        disabled={disabled || isLoading}
        onPress={onPress}
        onPressIn={() => { scale.value = withTiming(0.97, { duration: 80 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 120 }); }}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || isLoading }}
      >
        {isLoading ? (
          <ActivityIndicator color={isLabelDark ? '#00425F' : '#FFFFFF'} />
        ) : (
          <>
            {leftIcon}
            <Text style={[styles.label, isLabelDark && styles.labelDark]}>
              {children}
            </Text>
            {rightIcon}
          </>
        )}
      </AnimatedPressable>
    );
  }
);

Button.displayName = 'Button';
```

#### Toast — `useToast` hook

The hook lives in both `packages/react/src/hooks/useToast.ts` and `packages/react-native/src/hooks/useToast.ts`. Both follow the same API so Playground documentation only needs one description.

```typescript
export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const show = (props: ToastProps) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, ...props }]);
    if (props.duration !== Infinity) {
      setTimeout(() => dismiss(id), props.duration ?? 5000);
    }
  };

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, show, dismiss };
}
```

#### Modal — RN implementation note

Wraps RN's `Modal` primitive. Content is wrapped in `SafeAreaView` from `react-native-safe-area-context` to handle notch/home indicator insets automatically. Set `statusBarTranslucent` on Android.

#### HelperText — RN only (P1)

```typescript
// @switch/react-native only — no web equivalent in v1.0
export interface HelperTextProps {
  text: string;
  variant?: 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
}
```

---

### `playground` (Next.js docs app)

**Purpose:** Internal documentation site. Shows web and mobile component usage side by side.

**Key feature — `<CodeTabs />`:** Every component page renders a tab switcher showing the web (`@switch/react`) and RN (`@switch/react-native`) code snippets for the same component. This is the primary way mobile developers benefit from the Playground without needing a separate site or Storybook instance.

**`CodeTabs.tsx`:**

```typescript
'use client';
import { useState } from 'react';

type Platform = 'web' | 'react-native';

interface CodeTabsProps {
  web:         string;
  reactNative: string;
}

export function CodeTabs({ web, reactNative }: CodeTabsProps) {
  const [active, setActive] = useState<Platform>('web');
  return (
    <div>
      <div className="flex gap-2 mb-3">
        <button onClick={() => setActive('web')}
          className={active === 'web' ? 'tab-active' : 'tab'}>
          Web (React)
        </button>
        <button onClick={() => setActive('react-native')}
          className={active === 'react-native' ? 'tab-active' : 'tab'}>
          React Native
        </button>
      </div>
      <pre><code>{active === 'web' ? web : reactNative}</code></pre>
    </div>
  );
}
```

**`package.json`:**

```json
{
  "name": "playground",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@switch/react": "workspace:*",
    "@switch/tokens": "workspace:*",
    "@switch/types": "workspace:*",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@next/mdx": "^15.0.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "next-mdx-remote": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.0"
  }
}
```

---

## Token System

### Color Tokens (`src/tokens/color.json`)

```json
{
  "color": {
    "brand": {
      "pryBlue": { "$value": "#00425F", "$type": "color", "$description": "Primary brand" },
      "popBlue": { "$value": "#00B8DE", "$type": "color", "$description": "Interactive highlight" },
      "primaryRed": {
        "$value": "#EE312A",
        "$type": "color",
        "$description": "Error / destructive"
      },
      "primaryGrey": { "$value": "#EAECEF", "$type": "color", "$description": "Neutral surface" },
      "white": { "$value": "#FFFFFF", "$type": "color", "$description": "Base background" }
    },
    "semantic": {
      "primary": { "$value": "{color.brand.pryBlue}", "$type": "color" },
      "interactive": { "$value": "{color.brand.popBlue}", "$type": "color" },
      "danger": { "$value": "{color.brand.primaryRed}", "$type": "color" },
      "surface": { "$value": "{color.brand.primaryGrey}", "$type": "color" },
      "background": { "$value": "{color.brand.white}", "$type": "color" }
    }
  }
}
```

### Spacing (`src/tokens/spacing.json`)

```json
{
  "spacing": {
    "0": { "$value": "0px", "$type": "dimension" },
    "1": { "$value": "4px", "$type": "dimension" },
    "2": { "$value": "8px", "$type": "dimension" },
    "3": { "$value": "12px", "$type": "dimension" },
    "4": { "$value": "16px", "$type": "dimension" },
    "5": { "$value": "20px", "$type": "dimension" },
    "6": { "$value": "24px", "$type": "dimension" },
    "8": { "$value": "32px", "$type": "dimension" },
    "10": { "$value": "40px", "$type": "dimension" },
    "12": { "$value": "48px", "$type": "dimension" },
    "16": { "$value": "64px", "$type": "dimension" }
  }
}
```

> **RN output note:** Style Dictionary's `react-native` transform group strips `px` automatically. `"16px"` becomes `16` in `dist/rn/tokens.js`. Do NOT manually strip units in component code — rely on the token output.

### Typography (`src/tokens/typography.json`)

```json
{
  "typography": {
    "fontFamily": {
      "sans": { "$value": "Inter, system-ui, sans-serif", "$type": "fontFamily" },
      "mono": { "$value": "JetBrains Mono, monospace", "$type": "fontFamily" }
    },
    "fontSize": {
      "xs": { "$value": "12px", "$type": "dimension" },
      "sm": { "$value": "14px", "$type": "dimension" },
      "md": { "$value": "16px", "$type": "dimension" },
      "lg": { "$value": "18px", "$type": "dimension" },
      "xl": { "$value": "20px", "$type": "dimension" },
      "2xl": { "$value": "24px", "$type": "dimension" },
      "3xl": { "$value": "30px", "$type": "dimension" },
      "4xl": { "$value": "36px", "$type": "dimension" }
    },
    "fontWeight": {
      "regular": { "$value": 400, "$type": "fontWeight" },
      "medium": { "$value": 500, "$type": "fontWeight" },
      "semibold": { "$value": 600, "$type": "fontWeight" },
      "bold": { "$value": 700, "$type": "fontWeight" }
    }
  }
}
```

### Border Radius (`src/tokens/border-radius.json`)

```json
{
  "borderRadius": {
    "none": { "$value": "0px", "$type": "dimension" },
    "sm": { "$value": "4px", "$type": "dimension" },
    "md": { "$value": "8px", "$type": "dimension" },
    "lg": { "$value": "12px", "$type": "dimension" },
    "xl": { "$value": "16px", "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  }
}
```

---

## Component Specifications

All interfaces live in `@switch/types` and are shared by both platforms. Each platform package extends them with platform-specific props.

### Button

**Shared (`@switch/types/src/button.ts`):**

```typescript
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonShape = 'rectangular' | 'pill';
export type ButtonColor = 'popBlue' | 'activeBlue' | 'primaryBlue' | 'monochrome';

export interface ButtonBaseProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  colorScheme?: ButtonColor;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}
```

**Web extension (`@switch/react`):**

```typescript
import type { ButtonBaseProps } from '@switch/types';
export interface ButtonProps
  extends
    ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**RN extension (`@switch/react-native`):**

```typescript
import type { ButtonBaseProps } from '@switch/types';
import type { PressableProps } from 'react-native';
export interface ButtonProps
  extends ButtonBaseProps, Omit<PressableProps, 'children' | 'disabled' | 'onPress'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

---

### Input

**Shared:**

```typescript
export interface InputBaseProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  size?: 'small' | 'large';
}
```

> **RN note:** Use `TextInput` from `react-native`. Map `onChangeText` directly — there is no `onChange` event in RN.

---

### Modal

**Shared:**

```typescript
export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onPress: () => void;
    isLoading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}
```

---

### Toast

**Shared:**

```typescript
export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  type: ToastType;
  message: string;
  description?: string;
  duration?: number; // ms — default 5000, Infinity to persist
  onDismiss?: () => void;
}
```

> **RN note:** Animate in/out with Reanimated `FadeInDown` / `FadeOutDown` entering/exiting presets. Position absolutely at the bottom of the safe area using `react-native-safe-area-context`.

---

### Tabs

**Shared:**

```typescript
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  pill?: string | number;
  disabled?: boolean;
}

export interface TabsBaseProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'icon-leading' | 'pill';
}
```

> **RN note:** Use horizontal `ScrollView` for overflow. Use Reanimated for the active indicator slide animation.

---

### List Item

**Shared:**

```typescript
export type ListItemVariant = 'label' | 'label-avatar' | 'label-icon' | 'label-control';

export interface ListItemBaseProps {
  variant?: ListItemVariant;
  label: string;
  sublabel?: string;
  avatar?: { src?: string; initials: string };
  leadingIcon?: React.ReactNode;
  control?: React.ReactNode;
  onPress?: () => void;
}
```

> **RN note:** Use `Pressable` with `android_ripple` config for Android ripple feedback.

---

### HelperText (RN only — replaces Tooltip)

```typescript
// @switch/react-native only — no web equivalent in v1.0
export interface HelperTextProps {
  text: string;
  variant?: 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
}
```

---

## Documentation Site (Playground)

### Pages Structure

```
/                           → Home — welcome, quick start, platform overview
/tokens                     → Token explorer (colors, spacing, typography, radii)
/tokens/colors
/tokens/spacing
/tokens/typography
/components                 → Component index with platform availability badges
/components/button          → Button docs (web + RN tabs)
/components/input
/components/modal
/components/toast
/components/tabs
/components/list-item
/components/tooltip         → Web only — notes RN HelperText equivalent
/components/helper-text     → RN only
/components/date-picker
/guidelines
/guidelines/accessibility
/guidelines/platforms       → When to use web vs RN, how to consume each package
/guidelines/do-and-dont
/changelog
```

### Each Component Page Must Include

1. **Platform badge row** — `Web` / `iOS` / `Android` availability chips
2. **Live demo** — interactive Storybook iframe (web); screenshot or Expo Snack embed (RN)
3. **`<CodeTabs />`** — web and React Native code snippets side by side
4. **Props table** — auto-generated from `@switch/types` interface (one table, shared by both platforms)
5. **Platform notes** — callout block for any platform-specific behaviour differences
6. **Do / Don't section** — visual guidance from the Figma file
7. **Accessibility notes** — keyboard behaviour (web) and screen reader behaviour (iOS VoiceOver / Android TalkBack)
8. **Figma link** — direct link to the component node in Figma
9. **Consumer setup** — code block showing install + setup for each platform

---

## Testing Strategy

### Unit Testing — Web (`@switch/react`)

**Tools:** Vitest + @testing-library/react
**Coverage target:** ≥ 80%

```typescript
// Button.test.tsx (web)
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading indicator when isLoading is true', () => {
    render(<Button isLoading>Click</Button>);
    expect(screen.queryByText('Click')).not.toBeInTheDocument();
  });
});
```

### Unit Testing — React Native (`@switch/react-native`)

**Tools:** Jest (via `jest-expo`) + @testing-library/react-native
**Coverage target:** ≥ 80%

```typescript
// Button.test.tsx (RN)
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button (RN)', () => {
  it('renders label text', () => {
    const { getByText } = render(<Button>Tap me</Button>);
    expect(getByText('Tap me')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Tap</Button>);
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is not pressable when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button disabled onPress={onPress}>Tap</Button>);
    fireEvent.press(getByText('Tap'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders ActivityIndicator when loading', () => {
    const { UNSAFE_getByType } = render(<Button isLoading>Tap</Button>);
    const { ActivityIndicator } = require('react-native');
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
```

### Visual Testing — Web (Chromatic)

- Chromatic runs on every PR via GitHub Actions
- All Storybook story variants are captured as visual snapshots
- RN components are documented via screenshots in Playground — not captured by Chromatic

### Storybook Configuration

**`.storybook/main.ts`:**

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
```

**`.storybook/preview.ts`:**

```typescript
import type { Preview } from '@storybook/react';
import '@switch/tokens/css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'surface', value: '#EAECEF' },
      ],
    },
  },
};

export default preview;
```

**Story skeleton (web):**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size:        { control: 'select', options: ['small', 'medium', 'large'] },
    colorScheme: { control: 'select', options: ['monochrome', 'activeBlue'] },
    isLoading:   { control: 'boolean' },
    disabled:    { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Button', variant: 'primary', size: 'large', colorScheme: 'activeBlue' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button variant="primary"   colorScheme="activeBlue">Primary</Button>
      <Button variant="secondary" colorScheme="activeBlue">Secondary</Button>
      <Button variant="secondary" colorScheme="monochrome">Secondary</Button>
      <Button variant="tertiary"  colorScheme="monochrome">Tertiary</Button>
    </div>
  ),
};
```

---

## Figma Code Connect

Each component has **two** Code Connect files — one for web, one for RN. In Figma Dev Mode, developers see a platform switcher toggling between code snippets.

**Web — `Button.figma.tsx` (in `@switch/react`):**

```typescript
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core?node-id=BUTTON_NODE_ID',
  {
    props: {
      variant:     figma.enum('variant', { primary: 'primary', secondary: 'secondary', tertiary: 'tertiary' }),
      size:        figma.enum('size', { small: 'small', large: 'large' }),
      colorScheme: figma.enum('color', { monochrome: 'monochrome', activeBlue: 'activeBlue' }),
      children:    figma.string('label'),
    },
    example: ({ variant, size, colorScheme, children }) => (
      <Button variant={variant} size={size} colorScheme={colorScheme}>{children}</Button>
    ),
  }
);
```

**React Native — `Button.figma.tsx` (in `@switch/react-native`):**

```typescript
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core?node-id=BUTTON_NODE_ID',
  {
    props: {
      variant:  figma.enum('variant', { primary: 'primary', secondary: 'secondary', tertiary: 'tertiary' }),
      size:     figma.enum('size', { small: 'small', large: 'large' }),
      children: figma.string('label'),
    },
    example: ({ variant, size, children }) => (
      <Button variant={variant} size={size}>{children}</Button>
    ),
  }
);
```

**Publish both from CI:**

```bash
pnpm --filter @switch/react        figma connect publish --token $FIGMA_ACCESS_TOKEN
pnpm --filter @switch/react-native figma connect publish --token $FIGMA_ACCESS_TOKEN
```

---

## CI/CD Pipeline

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Build tokens first (all packages depend on it)
        run: pnpm --filter @switch/tokens build

      - name: Run all Turborepo tasks
        run: pnpm turbo build lint test
```

### `.github/workflows/chromatic.yml`

```yaml
name: Chromatic

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @switch/tokens build
      - run: pnpm --filter @switch/react build-storybook

      - uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: packages/react/storybook-static
          exitZeroOnChanges: true
```

### `turbo.json`

```json
{
  "$schema": "https://turborepo.dev/schema/v2.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "storybook-static/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "persistent": true,
      "cache": false
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "build-storybook": {
      "dependsOn": ["^build"],
      "outputs": ["storybook-static/**"]
    },
    "chromatic": {
      "dependsOn": ["build-storybook"],
      "cache": false
    }
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

## Developer Workflow

### Starting a new component (both platforms simultaneously)

```bash
# 1. Add shared interface to @switch/types
touch packages/types/src/new-component.ts
# Add export to packages/types/src/index.ts

# 2. Web component
mkdir -p packages/react/src/components/NewComponent
touch packages/react/src/components/NewComponent/{NewComponent.tsx,NewComponent.module.css,NewComponent.stories.tsx,NewComponent.test.tsx,NewComponent.figma.tsx,index.ts}

# 3. RN component
mkdir -p packages/react-native/src/components/NewComponent
touch packages/react-native/src/components/NewComponent/{NewComponent.tsx,NewComponent.styles.ts,NewComponent.test.tsx,NewComponent.figma.tsx,index.ts}

# 4. Export from both barrels
# packages/react/src/index.ts        → export * from './components/NewComponent';
# packages/react-native/src/index.ts → export * from './components/NewComponent';
```

### Daily dev loop

```bash
pnpm dev  # starts all watchers in parallel via Turborepo

# Or individually:
pnpm --filter @switch/tokens dev        # Token watch → all 4 dist targets
pnpm --filter @switch/react storybook  # Storybook on :6006
pnpm --filter playground dev           # Docs site on :3000
```

### Before opening a PR

```bash
pnpm turbo lint   # ESLint all packages
pnpm turbo test   # Vitest (web) + Jest (RN) all packages
pnpm turbo build  # Full build: tokens → types → react + react-native → playground
```

### Installing `@switch/react-native` in a consumer Expo app

```bash
npx expo install @switch/react-native \
  react-native-reanimated \
  react-native-gesture-handler \
  react-native-safe-area-context \
  react-native-screens
```

**Required root setup (`App.tsx`):**

```typescript
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* your app */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

---

## Naming Conventions

| Item                     | Convention               | Example                                   |
| ------------------------ | ------------------------ | ----------------------------------------- |
| Components (both)        | PascalCase               | `Button`, `ListItem`                      |
| Shared interfaces        | `{Name}BaseProps`        | `ButtonBaseProps`, `ModalBaseProps`       |
| Web prop extension       | `{Name}Props`            | `ButtonProps` (in `@switch/react`)        |
| RN prop extension        | `{Name}Props`            | `ButtonProps` (in `@switch/react-native`) |
| Web style file           | `{Name}.module.css`      | `Button.module.css`                       |
| RN style file            | `{Name}.styles.ts`       | `Button.styles.ts`                        |
| Story file               | `{Name}.stories.tsx`     | `Button.stories.tsx`                      |
| Test file (both)         | `{Name}.test.tsx`        | `Button.test.tsx`                         |
| Code Connect file (both) | `{Name}.figma.tsx`       | `Button.figma.tsx`                        |
| Token keys (JSON)        | camelCase                | `color.brand.pryBlue`                     |
| CSS custom properties    | `--switch-{token}`       | `--switch-color-brand-pry-blue`           |
| RN token access          | `tokens.color.brand.x`   | `tokens.color.brand.pryBlue` (unitless)   |
| Git branches             | `feat/`, `fix/`, `docs/` | `feat/button-rn`, `fix/toast-animation`   |
| Package names            | `@switch/{name}`         | `@switch/react`, `@switch/react-native`   |

---

## Bootstrap Commands

Run these in order to initialise the full project from scratch:

```bash
# 1. Create monorepo
pnpm dlx create-turbo@latest switch-core-playground --package-manager pnpm
cd switch-core-playground

# 2. Remove default example packages
rm -rf apps/docs apps/web packages/ui packages/eslint-config packages/typescript-config

# 3. Create all package directories
mkdir -p packages/tokens/src/tokens
mkdir -p packages/types/src
mkdir -p packages/react/src/components
mkdir -p packages/react-native/src/{components,hooks,utils}
mkdir -p packages/icons/src
mkdir -p packages/tsconfig
mkdir -p apps/playground

# 4. Tokens package
pnpm add style-dictionary@^5.4.0 typescript@^5 \
  --filter @switch/tokens --save-dev

# 5. Types package
pnpm add typescript@^5 @types/react@^19 \
  --filter @switch/types --save-dev

# 6. React (web) package
pnpm add react@^19 react-dom@^19 \
  --filter @switch/react --save-peer
pnpm add @switch/tokens @switch/types \
  --filter @switch/react
pnpm add \
  storybook@^8 @storybook/react@^8 @storybook/react-vite@^8 \
  @storybook/addon-essentials@^8 @storybook/addon-interactions@^8 \
  @storybook/addon-a11y@^8 @storybook/test@^8 \
  vitest@^3 @testing-library/react@^16 @testing-library/user-event@^14 \
  jsdom@^25 @figma/code-connect@^1 chromatic@^12 \
  typescript@^5 react@^19 react-dom@^19 \
  --filter @switch/react --save-dev

# 7. React Native (mobile) package
pnpm add @switch/tokens @switch/types \
  --filter @switch/react-native
pnpm add \
  expo@^55 react@^19 react-native@^0.84 \
  react-native-reanimated@^4.3.0 \
  react-native-gesture-handler@^2.28.0 \
  react-native-safe-area-context@^5.6.0 \
  react-native-screens@^4 \
  --filter @switch/react-native --save-peer
pnpm add \
  @testing-library/react-native@^13 \
  @figma/code-connect@^1 \
  @types/react@^19 \
  expo@^55 react@^19 react-native@^0.84 \
  jest@^29 jest-expo@^55 \
  react-native-reanimated@^4.3.0 \
  react-native-gesture-handler@^2.28.0 \
  react-native-safe-area-context@^5.6.0 \
  typescript@^5 \
  --filter @switch/react-native --save-dev

# 8. Init Storybook in react package
pnpm --filter @switch/react dlx storybook@latest init \
  --type react --builder vite --skip-install

# 9. Create playground Next.js app
pnpm dlx create-next-app@latest apps/playground \
  --typescript --tailwind --app \
  --import-alias "@/*" --use-pnpm

# 10. Add MDX to playground
pnpm add \
  @next/mdx@^15 @mdx-js/loader@^3 @mdx-js/react@^3 \
  next-mdx-remote@^5 @switch/react @switch/tokens @switch/types \
  --filter playground

# 11. Install all workspace deps
pnpm install

# 12. Build tokens first — all packages depend on it
pnpm --filter @switch/tokens build

# 13. Verify Turborepo pipeline
pnpm turbo build
```

---

## Agent Task Checklist

### Phase 0 — Scaffold

- [ ] Initialise Turborepo monorepo with pnpm workspaces
- [ ] Configure `turbo.json` with all task pipelines
- [ ] Configure `pnpm-workspace.yaml`
- [ ] Set up `@switch/tsconfig` with `base.json`, `react-library.json`, `react-native-library.json`, `nextjs.json`
- [ ] Configure root ESLint flat config and Prettier
- [ ] Set up `.gitignore`, `.nvmrc` (node 20), `.npmrc`
- [ ] Create `@switch/types` package scaffold with all component interface files

### Phase 1 — Tokens

- [ ] Create `color.json` with brand + semantic tokens
- [ ] Create `spacing.json`
- [ ] Create `typography.json`
- [ ] Create `border-radius.json`
- [ ] Write `sd.config.ts` with `css`, `js`, `tailwind`, and `rn` output targets
- [ ] Verify `pnpm --filter @switch/tokens build` produces all 4 output targets
- [ ] Confirm `dist/rn/tokens.js` contains unitless numbers — no `px` strings

### Phase 2 — Shared Types (`@switch/types`)

- [ ] `button.ts` — `ButtonBaseProps`
- [ ] `input.ts` — `InputBaseProps`
- [ ] `modal.ts` — `ModalBaseProps`
- [ ] `toast.ts` — `ToastProps`, `ToastType`
- [ ] `tabs.ts` — `TabItem`, `TabsBaseProps`
- [ ] `list-item.ts` — `ListItemBaseProps`, `ListItemVariant`
- [ ] `index.ts` barrel export

### Phase 3 — Web Components P0 (`@switch/react`)

- [ ] Button — all size/color/variant combinations
- [ ] Input — text input with label, helper, error states
- [ ] Select — dropdown with options, states
- [ ] Modal — title, content, primary + secondary actions
- [ ] Toast — 4 types + `useToast` hook

### Phase 4 — Web Components P1 (`@switch/react`)

- [ ] Tabs — default, icon-leading, pill variants
- [ ] List Item — all 4 variants
- [ ] Tooltip — 4 directions

### Phase 5 — Web Components P2 (`@switch/react`)

- [ ] Date Picker

### Phase 6 — RN Components P0 (`@switch/react-native`)

- [ ] Button — all variants, Reanimated scale press animation
- [ ] Input — `TextInput` wrapper with label, helper, error states
- [ ] Modal — RN Modal + SafeAreaView + action buttons
- [ ] Toast — Reanimated `FadeInDown`/`FadeOutDown` + `useToast` hook

### Phase 7 — RN Components P1 (`@switch/react-native`)

- [ ] Tabs — horizontal `ScrollView` + Reanimated active indicator
- [ ] List Item — all 4 variants with `Pressable` + `android_ripple`
- [ ] HelperText — RN-only inline helper (P1 — substitute for Tooltip)

### Phase 8 — RN Components P2 (`@switch/react-native`)

- [ ] Date Picker — `ScrollView` + `FlatList` calendar grid
- [ ] Tooltip — bottom sheet variant for RN (P2)

### Phase 9 — Storybook (Web)

- [ ] Configure `.storybook/main.ts` and `.storybook/preview.ts`
- [ ] Add stories for all P0 web components (all variants covered)
- [ ] Add stories for all P1 web components
- [ ] Verify `pnpm --filter @switch/react storybook` runs clean

### Phase 10 — Testing

- [ ] Configure Vitest for `@switch/react` (jsdom environment)
- [ ] Write Vitest tests for all web P0 components (≥ 80% coverage)
- [ ] Write Vitest tests for all web P1 components
- [ ] Configure `jest-expo` for `@switch/react-native`
- [ ] Write Jest tests for all RN P0 components (≥ 80% coverage)
- [ ] Write Jest tests for all RN P1 components
- [ ] Connect Chromatic project + confirm web snapshots publish on PR
- [ ] Set up GitHub Actions CI workflow
- [ ] Set up GitHub Actions Chromatic workflow

### Phase 11 — Playground Docs Site

- [ ] Scaffold Next.js 15 app with App Router + MDX + Tailwind
- [ ] Create `<CodeTabs />` web/RN switcher component
- [ ] Create `<PropTable />` auto-generated from TS interface
- [ ] Create `<PlatformBadge />` component
- [ ] Create sidebar navigation layout
- [ ] Home page with platform overview and quick start
- [ ] Token explorer pages (`/tokens/*`)
- [ ] Component page template with all 8 required sections
- [ ] Populate pages for all P0 components (web + RN tabs)
- [ ] Populate pages for all P1 components
- [ ] `/guidelines/platforms` — when to use web vs RN, how to consume each package, consumer app setup instructions

### Phase 12 — Figma Code Connect

- [ ] `Button.figma.tsx` for `@switch/react`
- [ ] `Button.figma.tsx` for `@switch/react-native`
- [ ] Repeat for Input, Modal, Toast, Tabs, List Item (web + RN each)
- [ ] Add `figma connect publish` (both packages) to release workflow

### Phase 13 — Polish & Release

- [ ] Set up Changesets for semantic versioning across all packages
- [ ] Write `CONTRIBUTING.md` covering both web and RN contribution workflows
- [ ] Write PR template with web + RN checklist
- [ ] Document all required GitHub secrets
- [ ] Final `pnpm turbo build` clean pass across all packages
- [ ] Tag `v0.1.0`

---

## Environment Variables & Secrets

| Secret Name               | Where Set      | Used By                               |
| ------------------------- | -------------- | ------------------------------------- |
| `CHROMATIC_PROJECT_TOKEN` | GitHub Secrets | Chromatic visual testing CI (web)     |
| `FIGMA_ACCESS_TOKEN`      | GitHub Secrets | Figma Code Connect publish (web + RN) |

---

## References

- [Turborepo Docs](https://turborepo.dev) — v2.9.4
- [Style Dictionary v5 Docs](https://styledictionary.com) — v5.4.0
- [Storybook 8 Docs](https://storybook.js.org) — v8.x
- [Next.js 15 Docs](https://nextjs.org/docs) — v15.x
- [React Native 0.84 Docs](https://reactnative.dev) — New Architecture default
- [Expo SDK 55 Docs](https://docs.expo.dev) — v55.x
- [Reanimated 4 Docs](https://docs.swmansion.com/react-native-reanimated) — v4.3.0
- [Gesture Handler Docs](https://docs.swmansion.com/react-native-gesture-handler) — v2.28.0
- [Figma Code Connect](https://www.figma.com/developers/code-connect) — v1.x
- [Chromatic Docs](https://www.chromatic.com/docs) — v12.x
- [Switch Core Figma File](https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/%F0%9F%9A%A7-Switch-Core?node-id=0-1)

---

_This document is the authoritative specification. The AI agent must reference this file before making any architectural decisions. When in doubt, follow the structure and conventions defined here._
