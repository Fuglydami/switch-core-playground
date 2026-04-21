import React from 'react';
import { View, Text } from 'react-native';
import type { HelperTextBaseProps } from '@switch/types';
import { styles, VARIANT_COLORS } from './HelperText.styles';

export interface HelperTextProps extends HelperTextBaseProps {}

const DEFAULT_ICONS: Record<NonNullable<HelperTextBaseProps['variant']>, string> = {
  info:    'ℹ',
  warning: '⚠',
  error:   '✕',
};

export function HelperText({ text, variant = 'info', icon }: HelperTextProps) {
  const color = VARIANT_COLORS[variant];
  const defaultIcon = DEFAULT_ICONS[variant];

  return (
    <View
      style={[styles.container, { borderLeftWidth: 3, borderLeftColor: color }]}
      accessibilityRole="none"
      accessibilityLiveRegion="polite"
    >
      <View style={styles.iconWrapper}>
        {icon ?? <Text style={{ color, fontSize: 13 }}>{defaultIcon}</Text>}
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
