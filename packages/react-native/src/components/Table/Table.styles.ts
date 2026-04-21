import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E6ED',
    overflow: 'hidden',
  },
  scrollView: {
    flexGrow: 0,
  },
  table: {
    minWidth: '100%',
  },
  thead: {
    backgroundColor: '#F9FBFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E6ED',
  },
  headerRow: {
    flexDirection: 'row',
  },
  th: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  thText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5F738C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sortIcon: {
    opacity: 0.4,
  },
  sortIconActive: {
    opacity: 1,
  },
  sortable: {
    // Pressable highlight handled inline
  },
  tbody: {},
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E6ED',
  },
  trLast: {
    borderBottomWidth: 0,
  },
  trClickable: {
    // Active state handled inline
  },
  trStriped: {
    backgroundColor: '#F9FBFC',
  },
  td: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  tdText: {
    fontSize: 14,
    color: '#353F50',
  },
  // Alignment
  left: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  // Dense variant
  dense: {},
  thDense: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tdDense: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  // Empty state
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#848F9F',
  },
  // Bordered variant
  bordered: {},
  thBordered: {
    borderRightWidth: 1,
    borderRightColor: '#E1E6ED',
  },
  thBorderedLast: {
    borderRightWidth: 0,
  },
  tdBordered: {
    borderRightWidth: 1,
    borderRightColor: '#E1E6ED',
  },
  tdBorderedLast: {
    borderRightWidth: 0,
  },
});
