import { StyleSheet } from 'react-native';

export const colors = {
  pryBlue: '#00425F',
  greyDark: '#5F6D7E',
  grey: '#EAECEF',
  greyLight: '#F5F6F8',
  white: '#FFFFFF',
} as const;

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  illustration: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.pryBlue,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.greyDark,
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
