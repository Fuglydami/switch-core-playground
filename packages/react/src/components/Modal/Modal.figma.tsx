import figma from '@figma/code-connect';
import { Modal } from './Modal';

figma.connect(
  Modal,
  'https://www.figma.com/design/wwcGjfpa7YixGCNO0eJk8b/Switch-Core?node-id=MODAL_NODE_ID',
  {
    props: {
      title: figma.string('modal-title'),
    },
    example: ({ title }) => (
      <Modal isOpen onClose={() => {}} title={title}>
        {/* Modal content goes here */}
      </Modal>
    ),
  }
);
