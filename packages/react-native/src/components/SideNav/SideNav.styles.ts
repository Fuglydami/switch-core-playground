import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  nav: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  navDark: {
    backgroundColor: '#1f2937',
    borderRightColor: '#374151',
  },
  logoSlot: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemList: {
    flex: 1,
    paddingVertical: 8,
  },
  footerSlot: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 12,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
  },
  nested: {
    paddingLeft: 40,
  },
  activeLight: {
    backgroundColor: 'rgba(0, 66, 95, 0.08)',
  },
  activeDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
  navIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  navLabelDark: {
    color: '#e5e7eb',
  },
  navLabelActive: {
    color: '#00425F',
    fontWeight: '600',
  },
  navLabelDisabled: {
    color: '#9ca3af',
  },
  badge: {
    backgroundColor: '#00B8DE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  chevron: {
    fontSize: 16,
    color: '#9ca3af',
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  childList: {
    marginLeft: 0,
  },
});
