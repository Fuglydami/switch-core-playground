import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core?node-id=BUTTON_NODE_ID',
  {
    props: {
      variant: figma.enum('variant', {
        primary: 'primary',
        secondary: 'secondary',
        tertiary: 'tertiary',
      }),
      size: figma.enum('size', {
        small: 'small',
        medium: 'medium',
        large: 'large',
      }),
      shape: figma.enum('shape', {
        rectangular: 'rectangular',
        pill: 'pill',
      }),
      colorScheme: figma.enum('color', {
        popBlue: 'popBlue',
        activeBlue: 'activeBlue',
        primaryBlue: 'primaryBlue',
        monochrome: 'monochrome',
      }),
      children: figma.string('label'),
      disabled: figma.enum('state', { disabled: true }),
    },
    example: ({ variant, size, shape, colorScheme, children, disabled }) => (
      <Button variant={variant} size={size} shape={shape} colorScheme={colorScheme} disabled={disabled}>
        {children}
      </Button>
    ),
  }
);
