import { StyleSheet } from 'react-native';

export const colors = {
  pryBlue: '#00425F',
  popBlue: '#00B8DE',
  grey: '#EAECEF',
  greyDark: '#5F6D7E',
  green: '#22C55E',
  white: '#FFFFFF',
} as const;

export const styles = StyleSheet.create({
  // Ring loader
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.grey,
    borderTopColor: colors.popBlue,
    borderRadius: 999,
  },
  ringSmall: {
    width: 24,
    height: 24,
    borderWidth: 2,
  },
  ringMedium: {
    width: 40,
    height: 40,
    borderWidth: 3,
  },
  ringLarge: {
    width: 56,
    height: 56,
    borderWidth: 4,
  },
  complete: {
    backgroundColor: colors.green,
    borderWidth: 0,
  },

  // Progress bar
  progressWrapper: {
    width: '100%',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.greyDark,
  },
  track: {
    width: '100%',
    backgroundColor: colors.grey,
    borderRadius: 999,
    overflow: 'hidden',
  },
  trackThin: {
    height: 4,
  },
  trackMedium: {
    height: 8,
  },
  trackThick: {
    height: 12,
  },
  fill: {
    height: '100%',
    backgroundColor: colors.popBlue,
    borderRadius: 999,
  },

  // Step progress
  stepList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepListVertical: {
    flexDirection: 'column',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  stepIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    borderWidth: 2,
    borderColor: colors.grey,
  },
  stepIndicatorActive: {
    backgroundColor: colors.white,
    borderColor: colors.popBlue,
  },
  stepIndicatorCompleted: {
    backgroundColor: colors.popBlue,
    borderColor: colors.popBlue,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.greyDark,
  },
  stepNumberActive: {
    color: colors.popBlue,
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: colors.grey,
    marginHorizontal: 8,
  },
  connectorDone: {
    backgroundColor: colors.popBlue,
  },
  connectorVertical: {
    width: 2,
    height: 24,
    marginLeft: 13,
    marginVertical: 4,
  },
  stepText: {
    marginLeft: 8,
  },
  stepTextHorizontal: {
    position: 'absolute',
    top: 36,
    left: 0,
    width: 80,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.pryBlue,
  },
  stepLabelPending: {
    color: colors.greyDark,
  },
  stepDescription: {
    fontSize: 11,
    color: colors.greyDark,
    marginTop: 2,
  },
});
