import { StyleSheet } from 'react-native';

export const colors = {
  pryBlue: '#00425F',
  popBlue: '#00B8DE',
  white: '#FFFFFF',
  grey: '#6b7280',
  lightGrey: '#f9fafb',
  trendUp: '#16a34a',
  trendDown: '#EE312A',
  trendNeutral: '#6b7280',
} as const;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  // Shadow variants
  shadowNone: {},
  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  shadowBase: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  // Padding variants
  padNone: {
    padding: 0,
  },
  padSmall: {
    padding: 12,
  },
  padMedium: {
    padding: 16,
  },
  padLarge: {
    padding: 24,
  },
  clickable: {
    // Active state handled via Pressable
  },
  // StatCard styles
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '500',
  },
  statIcon: {
    marginLeft: 8,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.pryBlue,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  trendUp: {
    color: colors.trendUp,
  },
  trendDown: {
    color: colors.trendDown,
  },
  trendNeutral: {
    color: colors.trendNeutral,
  },
  statAction: {
    marginTop: 16,
    paddingVertical: 8,
  },
  statActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.popBlue,
  },
});
