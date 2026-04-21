import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Modal } from './Modal';

describe('Modal (RN)', () => {
  it('renders title when visible', () => {
    const { getByText } = render(
      <Modal isOpen onClose={jest.fn()} title="Confirm">
        <></>
      </Modal>
    );
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('does not render when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={jest.fn()} title="Hidden">
        <></>
      </Modal>
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('calls onClose when close button pressed', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <Modal isOpen onClose={onClose} title="T">
        <></>
      </Modal>
    );
    fireEvent.press(getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders primary action button', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="T"
        primaryAction={{ label: 'Confirm', onPress }}
      >
        <></>
      </Modal>
    );
    fireEvent.press(getByText('Confirm'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders secondary action button', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="T"
        secondaryAction={{ label: 'Cancel', onPress }}
      >
        <></>
      </Modal>
    );
    fireEvent.press(getByText('Cancel'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
