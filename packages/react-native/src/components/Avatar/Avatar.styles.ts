import { StyleSheet } from 'react-native';

export const colors = {
  pryBlue: '#00425F',
  popBlue: '#00B8DE',
  grey: '#EAECEF',
  greyDark: '#5F6D7E',
  white: '#FFFFFF',
  green: '#22C55E',
  red: '#EF4444',
} as const;

export const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: colors.grey,
    overflow: 'hidden',
  },
  size40: {
    width: 40,
    height: 40,
  },
  size56: {
    width: 56,
    height: 56,
  },
  size80: {
    width: 80,
    height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  initials: {
    fontWeight: '600',
    color: colors.pryBlue,
  },
  initialsSize40: {
    fontSize: 14,
  },
  initialsSize56: {
    fontSize: 18,
  },
  initialsSize80: {
    fontSize: 24,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 999,
  },
  indicatorSize40: {
    width: 10,
    height: 10,
    bottom: 0,
    right: 0,
  },
  indicatorSize56: {
    width: 12,
    height: 12,
    bottom: 2,
    right: 2,
  },
  indicatorSize80: {
    width: 16,
    height: 16,
    bottom: 4,
    right: 4,
  },
  online: {
    backgroundColor: colors.green,
  },
  offline: {
    backgroundColor: colors.greyDark,
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  editOverlaySize40: {
    width: 20,
    height: 20,
  },
  editOverlaySize56: {
    width: 24,
    height: 24,
  },
  editOverlaySize80: {
    width: 28,
    height: 28,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupItem: {
    borderWidth: 2,
    borderColor: colors.white,
    marginLeft: -12,
  },
  groupItemFirst: {
    marginLeft: 0,
  },
  overflow: {
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -12,
    borderWidth: 2,
    borderColor: colors.white,
  },
  overflowText: {
    fontWeight: '600',
    color: colors.pryBlue,
    fontSize: 12,
  },
});
