import figma from '@figma/code-connect';
import { Toast } from './Toast';

figma.connect(
  Toast,
  'https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core?node-id=TOAST_NODE_ID',
  {
    props: {
      type: figma.enum('type', {
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error',
      }),
      message: figma.string('description'),
    },
    example: ({ type, message }) => <Toast type={type} message={message} />,
  }
);
