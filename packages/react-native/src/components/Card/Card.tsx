import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { CardBaseProps, StatCardBaseProps, TrendDirection } from '@switch/types';
import { styles } from './Card.styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface CardProps extends CardBaseProps {
  children: React.ReactNode;
}

export function Card({
  children,
  shadow = 'base',
  padding = 'medium',
  onPress,
}: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shadowStyle =
    shadow === 'none'
      ? styles.shadowNone
      : shadow === 'small'
      ? styles.shadowSmall
      : shadow === 'medium'
      ? styles.shadowMedium
      : styles.shadowBase;

  const paddingStyle =
    padding === 'none'
      ? styles.padNone
      : padding === 'small'
      ? styles.padSmall
      : padding === 'large'
      ? styles.padLarge
      : styles.padMedium;

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withTiming(0.98, { duration: 80 });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 120 });
        }}
        style={[styles.card, shadowStyle, paddingStyle, animatedStyle]}
        accessibilityRole="button"
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <View style={[styles.card, shadowStyle, paddingStyle]}>
      {children}
    </View>
  );
}

// StatCard component

export interface StatCardProps extends StatCardBaseProps {
  /** Optional icon or illustration in corner */
  icon?: React.ReactNode;
}

function TrendArrow({ direction }: { direction: TrendDirection }) {
  if (direction === 'up') {
    return (
      <Text style={[styles.trendText, styles.trendUp]}>{'\u2191'}</Text>
    );
  }
  if (direction === 'down') {
    return (
      <Text style={[styles.trendText, styles.trendDown]}>{'\u2193'}</Text>
    );
  }
  return null;
}

export function StatCard({
  title,
  value,
  trend,
  action,
  onAction,
  icon,
}: StatCardProps) {
  const trendStyle =
    trend?.direction === 'up'
      ? styles.trendUp
      : trend?.direction === 'down'
      ? styles.trendDown
      : styles.trendNeutral;

  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        {icon && <View style={styles.statIcon}>{icon}</View>}
      </View>

      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        {trend && (
          <View style={styles.trend}>
            <TrendArrow direction={trend.direction} />
            <Text style={[styles.trendText, trendStyle]}>{trend.value}</Text>
          </View>
        )}
      </View>

      {action && (
        <Pressable
          onPress={onAction}
          style={styles.statAction}
          accessibilityRole="button"
        >
          <Text style={styles.statActionText}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}
