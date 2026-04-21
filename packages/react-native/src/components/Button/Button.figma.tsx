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
      size: figma.enum('size', { small: 'small', large: 'large' }),
      children: figma.string('label'),
    },
    example: ({ variant, size, children }) => (
      <Button variant={variant} size={size}>{children}</Button>
    ),
  }
);
