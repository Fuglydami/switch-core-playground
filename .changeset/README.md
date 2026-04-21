# Changesets

This directory contains pending changesets — one file per unreleased change.

## Adding a changeset

```bash
pnpm changeset
```

Follow the prompts to select affected packages and write a summary.

## Releasing

Maintainers run `pnpm version-packages` to bump versions and update CHANGELOG files, then `pnpm release` to publish.
