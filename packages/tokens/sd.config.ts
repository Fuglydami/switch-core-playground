import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';

const config: Config = {
  source: ['src/tokens/*.json'],  // exclude figma-exports subfolder
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'switch',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.d.ts', format: 'typescript/es6-declarations' }],
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: 'dist/tailwind/',
      files: [{ destination: 'theme.js', format: 'javascript/es6' }],
    },
    rn: {
      // 'react-native' transform group strips 'px' → unitless numbers required by StyleSheet
      transformGroup: 'react-native',
      buildPath: 'dist/rn/',
      files: [
        { destination: 'tokens.js', format: 'javascript/es6' },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
      ],
    },
  },
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
