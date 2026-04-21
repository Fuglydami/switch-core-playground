import { StyleSheet } from 'react-native';

export const colors = {
  pryBlue: '#00425F',
  popBlue: '#00B8DE',
  white: '#FFFFFF',
  grey: '#6b7280',
  lightGrey: '#f3f4f6',
  selectedBg: 'rgba(0, 184, 222, 0.12)',
  selectedBorder: '#00B8DE',
  border: '#e5e7eb',
} as const;

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 4,
  },
  medium: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  selected: {
    backgroundColor: colors.selectedBg,
    borderColor: colors.selectedBorder,
  },
  disabled: {
    opacity: 0.4,
  },
  selectable: {
    // Cursor style handled via Pressable
  },
  icon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.pryBlue,
  },
  labelSmall: {
    fontSize: 12,
  },
  labelSelected: {
    color: colors.popBlue,
  },
  count: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grey,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 20,
    textAlign: 'center',
    overflow: 'hidden',
  },
  countSelected: {
    backgroundColor: colors.white,
    color: colors.popBlue,
  },
  closeButton: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: -4,
  },
  closeText: {
    fontSize: 12,
    color: colors.grey,
    lineHeight: 12,
  },
  closeTextSelected: {
    color: colors.popBlue,
  },
});
