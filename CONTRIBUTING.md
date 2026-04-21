# Contributing to Switch Core

Thanks for helping build Switch Core! This guide covers everything you need to get up and running.

---

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Monorepo structure](#monorepo-structure)
4. [Development workflow](#development-workflow)
5. [Adding a new component](#adding-a-new-component)
6. [Token changes](#token-changes)
7. [Testing](#testing)
8. [Changesets](#changesets)
9. [Submitting a PR](#submitting-a-pr)
10. [Code style](#code-style)

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node | ≥ 20 (see `.nvmrc`) |
| pnpm | ≥ 10 |
| nvm  | optional but recommended |

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

---

## Setup

```bash
git clone <repo-url>
cd switch-core-playground
nvm use          # picks up .nvmrc
pnpm install
```

---

## Monorepo structure

```
switch-core-playground/
├── packages/
│   ├── tokens/          # @switch/tokens  — Style Dictionary source + built outputs
│   ├── types/           # @switch/types   — shared TypeScript interfaces
│   ├── react/           # @switch/react   — web components (React 19)
│   ├── react-native/    # @switch/react-native — mobile components (RN new arch)
│   ├── icons/           # @switch/icons   — SVG icon components
│   └── tsconfig/        # @switch/tsconfig — shared TypeScript configs
└── apps/
    └── playground/      # internal Next.js docs site
```

---

## Development workflow

### Run everything

```bash
pnpm dev
```

Starts the playground (`localhost:3000`) and Storybook (`localhost:6006`) in parallel via Turborepo.

### Playground only

```bash
cd apps/playground
pnpm dev
```

### Storybook only

```bash
cd packages/react
pnpm storybook
```

### Build all packages

```bash
pnpm build
```

Turborepo builds packages in dependency order: `tokens → types → react / react-native`.

---

## Adding a new component

### 1. Define shared types in `@switch/types`

Create `packages/types/src/<component-name>.ts` with base props (use `onPress`, not `onClick`).  
Export from `packages/types/src/index.ts`.

### 2. Implement the web component in `@switch/react`

```
packages/react/src/components/<ComponentName>/
├── <ComponentName>.tsx         # component
├── <ComponentName>.module.css  # scoped styles
├── <ComponentName>.stories.tsx # Storybook stories
├── <ComponentName>.test.tsx    # Vitest + Testing Library
├── <ComponentName>.figma.tsx   # Figma Code Connect
└── index.ts                    # named exports
```

- Map `onPress` → native `onClick` inside the component; do not leak `onClick` to the public API.
- Add the export to `packages/react/src/index.ts`.

### 3. Implement the React Native component in `@switch/react-native`

```
packages/react-native/src/components/<ComponentName>/
├── <ComponentName>.tsx         # component (Pressable / Reanimated)
├── <ComponentName>.styles.ts   # StyleSheet.create(...)
├── <ComponentName>.test.tsx    # @testing-library/react-native
├── <ComponentName>.figma.tsx   # Figma Code Connect
└── index.ts                    # named exports
```

- Use Reanimated v4 New Architecture APIs only — no legacy bridge.
- Wrap interactive elements in `Pressable`; use `android_ripple` for material feedback.
- Add the export to `packages/react-native/src/index.ts`.

### 4. Add a playground page

Create `apps/playground/app/components/<name>/page.tsx` following the existing page structure:

- `PlatformBadge` at the top
- `CodeTabs` (web + React Native code snippets)
- `PropsTable`
- Platform Notes section
- Accessibility section

Add the route to [apps/playground/components/Sidebar.tsx](apps/playground/components/Sidebar.tsx).

---

## Token changes

Token source files live in `packages/tokens/src/tokens/`. After editing:

```bash
cd packages/tokens
pnpm build
```

This runs Style Dictionary and regenerates:
- `dist/css/tokens.css` — CSS custom properties
- `dist/js/tokens.js` — JS module
- `dist/rn/tokens.js` — unitless numbers for React Native

Commit both the source JSON and the `dist/` outputs so consumers don't need to run the build step.

---

## Testing

### Unit tests (web)

```bash
cd packages/react
pnpm test           # run once
pnpm test --watch   # watch mode
```

Uses Vitest + @testing-library/react in a jsdom environment.

### Unit tests (React Native)

```bash
cd packages/react-native
pnpm test
```

Uses Jest + @testing-library/react-native.

### Run all tests

```bash
pnpm test   # from root — Turborepo fans out to all packages
```

---

## Changesets

We use [Changesets](https://github.com/changesets/changesets) for versioning.

**Every PR that touches a public package API must include a changeset.**

```bash
pnpm changeset
```

Follow the prompts:
1. Select affected packages (use space to toggle, enter to confirm).
2. Choose the semver bump type:
   - `patch` — bug fix, no API change
   - `minor` — new feature, backwards-compatible
   - `major` — breaking API change
3. Write a one-sentence summary for the CHANGELOG.

Commit the generated `.changeset/*.md` file alongside your code changes.

> The `playground` app is excluded from versioning and does not need a changeset.

---

## Submitting a PR

1. Branch off `main`: `git checkout -b feat/my-feature`
2. Make your changes.
3. Add a changeset if needed: `pnpm changeset`
4. Run `pnpm lint && pnpm test` — both must pass.
5. Open a PR against `main`. Fill in the PR template.
6. A maintainer will review and merge.

---

## Code style

- **Formatter**: Prettier (config in `.prettierrc`). Run `pnpm format` before committing.
- **Linter**: ESLint 9 flat config (`eslint.config.js`). Run `pnpm lint`.
- **TypeScript**: strict mode enabled in all packages.
- **Naming**: PascalCase for components, camelCase for hooks and utilities.
- **Prop convention**: Use `onPress` for all interactive callbacks (web and RN). Web components map this to `onClick` internally.
- **No default exports** from component files — use named exports only.
- **No `any`** — use `unknown` and narrow, or add a precise type.
