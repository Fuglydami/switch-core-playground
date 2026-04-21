/**
 * @switch/icons build script
 *
 * Reads SVGs from src/svgs/, runs SVGR to generate:
 *   - dist/react/   — React web components (SVG via <svg>)
 *   - dist/react-native/ — React Native components (SVG via react-native-svg)
 *
 * Also writes index files and .d.ts stubs.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { transform } from '@svgr/core';

const SRC = new URL('../src/svgs/', import.meta.url).pathname;
const DIST_WEB = new URL('../dist/react/', import.meta.url).pathname;
const DIST_RN = new URL('../dist/react-native/', import.meta.url).pathname;

mkdirSync(DIST_WEB, { recursive: true });
mkdirSync(DIST_RN, { recursive: true });

/** Convert kebab-case file name to PascalCase component name */
function toPascal(name) {
  return name
    .replace(/\.svg$/, '')
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('') + 'Icon';
}

const svgFiles = readdirSync(SRC).filter((f) => f.endsWith('.svg'));
const webExports = [];
const rnExports = [];

for (const file of svgFiles) {
  const svg = readFileSync(join(SRC, file), 'utf8');
  const name = toPascal(basename(file));

  // ── Web (React DOM) ──────────────────────────────────────────────────────
  const webCode = await transform(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgoConfig: { plugins: [{ name: 'preset-default' }] },
      typescript: false,
      exportType: 'named',
      namedExport: name,
      svgProps: { 'aria-hidden': 'true', focusable: 'false' },
    },
    { componentName: name }
  );
  writeFileSync(join(DIST_WEB, `${name}.js`), webCode);
  writeFileSync(
    join(DIST_WEB, `${name}.d.ts`),
    `import type { SVGProps } from 'react';\nexport declare function ${name}(props: SVGProps<SVGSVGElement>): JSX.Element;\n`
  );
  webExports.push(name);

  // ── React Native (react-native-svg) ──────────────────────────────────────
  const rnCode = await transform(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgoConfig: { plugins: [{ name: 'preset-default' }] },
      native: true,
      typescript: false,
      exportType: 'named',
      namedExport: name,
    },
    { componentName: name }
  );
  writeFileSync(join(DIST_RN, `${name}.js`), rnCode);
  writeFileSync(
    join(DIST_RN, `${name}.d.ts`),
    `import type { SvgProps } from 'react-native-svg';\nexport declare function ${name}(props: SvgProps): JSX.Element;\n`
  );
  rnExports.push(name);

  console.log(`✔ ${name}`);
}

// Index files
const webIndex = webExports.map((n) => `export { ${n} } from './${n}.js';`).join('\n') + '\n';
writeFileSync(join(DIST_WEB, 'index.js'), webIndex);
writeFileSync(join(DIST_WEB, 'index.d.ts'), webExports.map((n) => `export { ${n} } from './${n}';`).join('\n') + '\n');

const rnIndex = rnExports.map((n) => `export { ${n} } from './${n}.js';`).join('\n') + '\n';
writeFileSync(join(DIST_RN, 'index.js'), rnIndex);
writeFileSync(join(DIST_RN, 'index.d.ts'), rnExports.map((n) => `export { ${n} } from './${n}';`).join('\n') + '\n');

console.log(`\n✅ Built ${svgFiles.length} icons → react/ and react-native/`);
