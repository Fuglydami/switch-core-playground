import { StyleSheet } from 'react-native';

export const colors = {
  pryBlue: '#00425F',
  popBlue: '#00B8DE',
  grey: '#EAECEF',
  greyDark: '#5F6D7E',
  white: '#FFFFFF',
} as const;

export const styles = StyleSheet.create({
  // Shared wrapper
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  disabled: {
    opacity: 0.4,
  },

  // Checkbox / Radio control
  control: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.greyDark,
    backgroundColor: colors.white,
  },
  controlChecked: {
    backgroundColor: colors.popBlue,
    borderColor: colors.popBlue,
  },
  square: {
    borderRadius: 4,
  },
  circle: {
    borderRadius: 999,
  },
  size16: {
    width: 16,
    height: 16,
  },
  size20: {
    width: 20,
    height: 20,
  },
  size24: {
    width: 24,
    height: 24,
  },

  // Radio specific
  radioDot: {
    backgroundColor: colors.white,
    borderRadius: 999,
  },
  radioDotSize16: {
    width: 6,
    height: 6,
  },
  radioDotSize20: {
    width: 8,
    height: 8,
  },
  radioDotSize24: {
    width: 10,
    height: 10,
  },

  // Label
  label: {
    fontSize: 14,
    color: colors.pryBlue,
  },

  // Toggle track
  track: {
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: colors.grey,
  },
  trackChecked: {
    backgroundColor: colors.popBlue,
  },
  trackSmall: {
    width: 36,
    height: 20,
    paddingHorizontal: 2,
  },
  trackMedium: {
    width: 44,
    height: 24,
    paddingHorizontal: 2,
  },
  trackLarge: {
    width: 52,
    height: 28,
    paddingHorizontal: 3,
  },

  // Toggle thumb
  thumb: {
    backgroundColor: colors.white,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  thumbSmall: {
    width: 16,
    height: 16,
  },
  thumbMedium: {
    width: 20,
    height: 20,
  },
  thumbLarge: {
    width: 22,
    height: 22,
  },
});
