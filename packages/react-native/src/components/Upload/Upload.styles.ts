import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  // Drop zone / picker area
  dropZone: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E1E6ED',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  dropZonePressed: {
    borderColor: '#0066FF',
    backgroundColor: '#F5F8FF',
  },
  dropZoneDisabled: {
    opacity: 0.5,
  },
  uploadIcon: {
    color: '#5F738C',
    marginBottom: 4,
  },
  dropText: {
    fontSize: 14,
    color: '#5F738C',
    textAlign: 'center',
  },
  dropTextBold: {
    color: '#0066FF',
    fontWeight: '600',
  },
  dropHint: {
    fontSize: 12,
    color: '#848F9F',
    textAlign: 'center',
  },
  // File list
  fileList: {
    gap: 8,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E1E6ED',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  fileRowFailed: {
    borderColor: '#E53935',
    backgroundColor: '#FEF3F2',
  },
  fileRowCompleted: {
    borderColor: '#10B981',
  },
  fileIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIconDefault: {
    color: '#5F738C',
  },
  fileIconSuccess: {
    color: '#10B981',
  },
  fileIconError: {
    color: '#E53935',
  },
  fileMeta: {
    flex: 1,
    gap: 4,
  },
  fileNameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#353F50',
  },
  fileSize: {
    fontSize: 12,
    color: '#5F738C',
  },
  fileError: {
    fontSize: 12,
    color: '#E53935',
  },
  // Progress bar
  progressTrack: {
    height: 4,
    backgroundColor: '#E1E6ED',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0066FF',
    borderRadius: 2,
  },
  // Actions
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  retryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066FF',
    textDecorationLine: 'underline',
  },
  removeBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  removeBtnPressed: {
    backgroundColor: '#E1E6ED',
  },
});
