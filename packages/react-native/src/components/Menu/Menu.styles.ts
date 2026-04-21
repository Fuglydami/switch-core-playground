import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
  },
  itemPressed: {
    backgroundColor: '#f3f4f6',
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemIcon: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  itemDanger: {
    color: '#EE312A',
  },
  itemLabelDisabled: {
    color: '#9ca3af',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
});
