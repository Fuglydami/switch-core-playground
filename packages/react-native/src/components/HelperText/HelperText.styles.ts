import { StyleSheet } from 'react-native';

export const VARIANT_COLORS = {
  info:    '#00B8DE',
  warning: '#d97706',
  error:   '#EE312A',
} as const;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  iconWrapper: { marginTop: 1 },
  text: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#374151',
  },
});
