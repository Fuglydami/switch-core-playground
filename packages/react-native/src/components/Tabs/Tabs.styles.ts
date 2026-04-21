import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { position: 'relative' },
  scrollContent: { flexDirection: 'row', gap: 0 },

  // Default / icon-leading
  tablistDefault: {
    borderBottomWidth: 2,
    borderBottomColor: '#EAECEF',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom: -2,
  },
  tabActive: {
    borderBottomColor: '#00B8DE',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabLabelActive: { color: '#00B8DE' },
  tabDisabled: { opacity: 0.4 },

  // Pill variant
  tablistPill: {
    flexDirection: 'row',
    backgroundColor: '#EAECEF',
    borderRadius: 9999,
    padding: 4,
    gap: 4,
  },
  pillTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    gap: 8,
  },
  pillTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  pillLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  pillLabelActive: { color: '#00425F' },

  pill: {
    backgroundColor: '#00B8DE',
    borderRadius: 9999,
    paddingHorizontal: 6,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
});
