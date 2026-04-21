import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  triggerError: {
    borderColor: '#dc2626',
  },
  triggerDisabled: {
    opacity: 0.5,
    backgroundColor: '#f3f4f6',
  },
  triggerText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  triggerPlaceholder: {
    color: '#9ca3af',
  },
  errorMessage: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 2,
  },
  // Modal overlay
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d1d5db',
    marginTop: 10,
    marginBottom: 8,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sheetAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00425F',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});
