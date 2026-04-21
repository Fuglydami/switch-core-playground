import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No results found" testID="empty" />);
    expect(screen.getByText('No results found')).toBeTruthy();
  });

  it('renders description when provided', () => {
    render(
      <EmptyState
        title="No results"
        description="Try adjusting your search criteria"
        testID="empty"
      />
    );
    expect(screen.getByText('Try adjusting your search criteria')).toBeTruthy();
  });

  it('renders without description', () => {
    render(<EmptyState title="No results" testID="empty" />);
    expect(screen.getByTestId('empty')).toBeTruthy();
    expect(screen.queryByText('Try adjusting')).toBeNull();
  });

  it('renders custom illustration', () => {
    render(
      <EmptyState
        title="No results"
        illustration={<Text>Custom Illustration</Text>}
        testID="empty"
      />
    );
    // Custom illustration is rendered (query including hidden elements)
    expect(screen.getByText('Custom Illustration', { includeHiddenElements: true })).toBeTruthy();
  });

  it('renders primary action', () => {
    render(
      <EmptyState
        title="No results"
        action={<Pressable testID="action-btn"><Text>Add Item</Text></Pressable>}
        testID="empty"
      />
    );
    expect(screen.getByTestId('action-btn')).toBeTruthy();
    expect(screen.getByText('Add Item')).toBeTruthy();
  });

  it('renders secondary action', () => {
    render(
      <EmptyState
        title="No results"
        secondaryAction={<Pressable testID="secondary-btn"><Text>Learn more</Text></Pressable>}
        testID="empty"
      />
    );
    expect(screen.getByTestId('secondary-btn')).toBeTruthy();
  });

  it('renders both actions', () => {
    render(
      <EmptyState
        title="No results"
        action={<Pressable testID="primary"><Text>Primary</Text></Pressable>}
        secondaryAction={<Pressable testID="secondary"><Text>Secondary</Text></Pressable>}
        testID="empty"
      />
    );
    expect(screen.getByTestId('primary')).toBeTruthy();
    expect(screen.getByTestId('secondary')).toBeTruthy();
  });

  it('has accessible header role on title', () => {
    render(<EmptyState title="No results found" testID="empty" />);
    expect(screen.getByRole('header')).toBeTruthy();
  });
});
