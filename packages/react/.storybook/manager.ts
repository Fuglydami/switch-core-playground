import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',

  // Brand
  brandTitle: 'Switch Design System',
  brandUrl: 'https://switch.com',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#0275d8',
  colorSecondary: '#0275d8',

  // UI
  appBg: '#f9fbfc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e1e6ed',
  appBorderRadius: 8,

  // Text colors
  textColor: '#353f50',
  textInverseColor: '#ffffff',
  textMutedColor: '#5f738c',

  // Toolbar
  barTextColor: '#5f738c',
  barSelectedColor: '#0275d8',
  barHoverColor: '#0275d8',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#c8d2df',
  inputTextColor: '#353f50',
  inputBorderRadius: 6,

  // Font
  fontBase: '"Averta", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "SF Mono", Monaco, monospace',
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    zoom: { hidden: false },
    eject: { hidden: true },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
