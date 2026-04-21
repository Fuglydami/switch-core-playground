import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%',
  },
  vertical: {
    width: 1,
    backgroundColor: '#e5e7eb',
    alignSelf: 'stretch',
  },
  labelled: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
