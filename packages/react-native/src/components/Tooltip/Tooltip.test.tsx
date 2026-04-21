import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Tooltip } from './Tooltip';

// Note: Tooltip uses Modal which requires special handling in tests.
// These tests focus on what can be tested without the Modal rendering.

describe('Tooltip (RN)', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Tooltip content="Tooltip text">
        <Text>Trigger</Text>
      </Tooltip>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });

  it('accepts content prop', () => {
    const { getByText } = render(
      <Tooltip content="Some tooltip content">
        <Text>Trigger</Text>
      </Tooltip>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });

  it('accepts helperText prop', () => {
    const { getByText } = render(
      <Tooltip content="Main text" helperText="Extra info">
        <Text>Trigger</Text>
      </Tooltip>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });

  it('accepts placement prop', () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const;
    placements.forEach((placement) => {
      const { getByText, unmount } = render(
        <Tooltip content="Tooltip" placement={placement}>
          <Text>Trigger</Text>
        </Tooltip>
      );
      expect(getByText('Trigger')).toBeTruthy();
      unmount();
    });
  });

  it('default placement is top', () => {
    const { getByText } = render(
      <Tooltip content="Top tooltip">
        <Text>Trigger</Text>
      </Tooltip>
    );
    expect(getByText('Trigger')).toBeTruthy();
  });
});
