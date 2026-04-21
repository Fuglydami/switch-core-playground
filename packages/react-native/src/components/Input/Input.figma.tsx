import figma from '@figma/code-connect';
import { Input } from './Input';

figma.connect(
  Input,
  'https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core?node-id=INPUT_NODE_ID',
  {
    props: {
      label: figma.string('label'),
      placeholder: figma.string('placeholder'),
      isError: figma.enum('state', { error: true }),
      disabled: figma.enum('state', { disabled: true }),
    },
    example: ({ label, placeholder, isError, disabled }) => (
      <Input label={label} placeholder={placeholder} isError={isError} disabled={disabled} />
    ),
  }
);
