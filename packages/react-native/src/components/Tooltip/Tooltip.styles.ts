import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: '#1f2937',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    maxWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  top: {},
  bottom: {},
  left: {},
  right: {},
  content: {
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 18,
  },
  helperText: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
    lineHeight: 14,
  },
});
