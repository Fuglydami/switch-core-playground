import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: { gap: 4 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00425F',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    paddingHorizontal: 16,
  },
  inputWrapperSmall: { minHeight: 36, paddingHorizontal: 12 },
  inputWrapperFocused: { borderColor: '#00B8DE' },
  inputWrapperError: { borderColor: '#EE312A' },
  inputWrapperDisabled: { backgroundColor: '#EAECEF' },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#00425F',
    paddingVertical: 0,
  },
  inputSmall: { fontSize: 14 },
  addon: {
    color: '#6b7280',
    marginHorizontal: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
  },
  errorText: { color: '#EE312A' },
});
