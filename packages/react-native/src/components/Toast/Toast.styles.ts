import { StyleSheet } from 'react-native';

export const TYPE_COLORS = {
  info:    '#00B8DE',
  success: '#16a34a',
  warning: '#d97706',
  error:   '#EE312A',
} as const;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    gap: 8,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  icon: {
    marginTop: 1,
  },
  body: { flex: 1 },
  message: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00425F',
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  dismiss: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissText: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 14,
  },
});
