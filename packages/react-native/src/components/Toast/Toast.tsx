import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ToastBaseProps, ToastType } from '@switch/types';
import { styles, TYPE_COLORS } from './Toast.styles';

export interface ToastProps extends ToastBaseProps {}

const TYPE_ICONS: Record<ToastType, string> = {
  info:    'ℹ',
  success: '✓',
  warning: '⚠',
  error:   '✕',
};

export function Toast({ type, message, description, onDismiss }: ToastProps) {
  const borderColor = TYPE_COLORS[type];

  return (
    <Animated.View
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(150)}
      style={[styles.toast, { borderLeftColor: borderColor }]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View style={styles.icon}>
        <Text style={{ color: borderColor, fontSize: 16 }}>{TYPE_ICONS[type]}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.message}>{message}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          style={styles.dismiss}
          accessibilityLabel="Dismiss notification"
          accessibilityRole="button"
        >
          <Text style={styles.dismissText}>✕</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

export interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  return (
    <View style={[styles.container, { bottom: Math.max(24, insets.bottom + 8) }]}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
    </View>
  );
}
