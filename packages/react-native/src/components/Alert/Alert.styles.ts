import { StyleSheet } from 'react-native';

export const VARIANT_COLORS = {
  info: {
    background: 'rgba(0, 184, 222, 0.08)',
    border: '#00B8DE',
    icon: '#00B8DE',
  },
  success: {
    background: 'rgba(22, 163, 74, 0.08)',
    border: '#16a34a',
    icon: '#16a34a',
  },
  warning: {
    background: 'rgba(217, 119, 6, 0.08)',
    border: '#d97706',
    icon: '#d97706',
  },
  danger: {
    background: 'rgba(238, 49, 42, 0.08)',
    border: '#EE312A',
    icon: '#EE312A',
  },
  primary: {
    background: 'rgba(0, 66, 95, 0.08)',
    border: '#00425F',
    icon: '#00425F',
  },
  secondary: {
    background: 'rgba(107, 114, 128, 0.08)',
    border: '#6b7280',
    icon: '#6b7280',
  },
} as const;

export const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  icon: {
    marginTop: 2,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00425F',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  contentWrapper: {
    // For non-text children, no text styles
  },
  dismiss: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: -4,
  },
  dismissText: {
    fontSize: 16,
    color: '#9ca3af',
    lineHeight: 16,
  },
});
