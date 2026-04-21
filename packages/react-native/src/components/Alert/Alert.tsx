import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { AlertBaseProps, AlertVariant } from '@switch/types';
import { styles, VARIANT_COLORS } from './Alert.styles';

export interface AlertProps extends AlertBaseProps {
  children: React.ReactNode;
  /** Optional leading icon override */
  icon?: React.ReactNode;
}

const VARIANT_ICONS: Record<AlertVariant, string> = {
  info: 'i',
  success: '\u2713',
  warning: '\u26A0',
  danger: '!',
  primary: 'i',
  secondary: 'i',
};

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
}: AlertProps) {
  const colors = VARIANT_COLORS[variant];

  return (
    <View
      style={[
        styles.alert,
        {
          backgroundColor: colors.background,
          borderLeftColor: colors.border,
        },
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.icon}>
        {icon ?? (
          <Text style={{ color: colors.icon, fontSize: 16, fontWeight: '700' }}>
            {VARIANT_ICONS[variant]}
          </Text>
        )}
      </View>

      <View style={styles.body}>
        {title && <Text style={styles.title}>{title}</Text>}
        {typeof children === 'string' ? (
          <Text style={styles.content}>{children}</Text>
        ) : (
          <View style={styles.contentWrapper}>{children}</View>
        )}
      </View>

      {dismissible && onDismiss && (
        <Pressable
          onPress={onDismiss}
          style={styles.dismiss}
          accessibilityLabel="Dismiss alert"
          accessibilityRole="button"
        >
          <Text style={styles.dismissText}>{'\u2715'}</Text>
        </Pressable>
      )}
    </View>
  );
}
