---
"@switch/react": patch
"@switch/types": patch
---

Fix component styling to match design specifications:

- Button: Add `outline` and `link` variants, `square` and `circle` icon-only shapes for all color schemes (popBlue, activeBlue, primaryBlue, monochrome)
- Avatar: Change initials background from activeBlue to popBlue (#00B8DE) per design spec
- Loader: Update ring loader CSS for SVG-based implementation with progress percentage display, complete state checkmark, and indeterminate spinning animation
