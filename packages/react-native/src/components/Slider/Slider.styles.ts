import { StyleSheet } from 'react-native';

export const colors = {
  pryBlue: '#00425F',
  popBlue: '#00B8DE',
  white: '#FFFFFF',
  grey: '#6b7280',
  trackBg: '#e5e7eb',
  thumbBorder: '#d1d5db',
} as const;

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  track: {
    width: '100%',
    backgroundColor: colors.trackBg,
    borderRadius: 999,
    overflow: 'visible',
    position: 'relative',
  },
  trackSmall: {
    height: 4,
  },
  trackLarge: {
    height: 6,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.popBlue,
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.popBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    transform: [{ translateX: -10 }, { translateY: -7 }],
  },
  thumbSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    transform: [{ translateX: -8 }, { translateY: -6 }],
  },
  thumbActive: {
    borderColor: colors.pryBlue,
    transform: [{ translateX: -10 }, { translateY: -7 }, { scale: 1.1 }],
  },
  thumbDisabled: {
    borderColor: colors.grey,
    backgroundColor: colors.trackBg,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  labelText: {
    fontSize: 12,
    color: colors.grey,
  },
  // Range slider specific
  rangeFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colors.popBlue,
    borderRadius: 999,
  },
  disabled: {
    opacity: 0.5,
  },
});
