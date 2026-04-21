import { StyleSheet } from 'react-native';

/**
 * Token values are imported inline as literals here so this file has
 * no build-time dependency on the token output. The tokens package must
 * be built first in CI; consuming apps use @switch/tokens/rn directly.
 */
export const colors = {
  pryBlue: '#00425F',
  popBlue: '#00B8DE',
  red: '#EE312A',
  grey: '#EAECEF',
  white: '#FFFFFF',
} as const;

export const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 40,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  // activeBlue variants
  primaryActiveBlue: {
    backgroundColor: colors.popBlue,
  },
  secondaryActiveBlue: {
    backgroundColor: 'rgba(0,184,222,0.12)',
  },
  tertiaryActiveBlue: {
    backgroundColor: 'transparent',
  },
  // monochrome variants
  primaryMonochrome: {
    backgroundColor: colors.pryBlue,
  },
  secondaryMonochrome: {
    backgroundColor: 'rgba(0,66,95,0.10)',
  },
  tertiaryMonochrome: {
    backgroundColor: 'transparent',
  },
  disabled: { opacity: 0.4 },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
  labelSmall: { fontSize: 14 },
  labelDark: { color: colors.pryBlue },
  labelBlue: { color: colors.popBlue },
});
