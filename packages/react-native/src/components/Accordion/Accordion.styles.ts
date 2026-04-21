import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  accordion: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  borderless: {
    borderWidth: 0,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemBordered: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderBottomWidth: 0,
    marginTop: -1,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  triggerOpen: {
    backgroundColor: '#f9fafb',
  },
  leadingIcon: {
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#00425F',
  },
  labelDisabled: {
    color: '#9ca3af',
  },
  chevron: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    fontSize: 18,
    color: '#6b7280',
    lineHeight: 20,
  },
  panel: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  panelContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
