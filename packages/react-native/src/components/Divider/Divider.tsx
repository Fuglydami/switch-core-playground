import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Divider.styles';

export interface DividerProps {
  /** Optional centred label */
  label?: string;
  /** Vertical or horizontal */
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ label, orientation = 'horizontal' }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <View
        style={styles.vertical}
        accessibilityRole="none"
        accessibilityLabel="Separator"
      />
    );
  }

  if (label) {
    return (
      <View
        style={styles.labelled}
        accessibilityRole="none"
        accessibilityLabel={`Separator: ${label}`}
      >
        <View style={styles.line} />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return (
    <View
      style={styles.horizontal}
      accessibilityRole="none"
      accessibilityLabel="Separator"
    />
  );
}
