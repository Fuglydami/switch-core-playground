import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { styles, colors } from './EmptyState.styles';

export interface EmptyStateProps {
  /** Illustration or icon element */
  illustration?: React.ReactNode;
  title: string;
  description?: string;
  /** Primary action button */
  action?: React.ReactNode;
  /** Secondary action (link, ghost button, etc.) */
  secondaryAction?: React.ReactNode;
  testID?: string;
}

function DefaultIllustration() {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
      <Rect x={12} y={20} width={56} height={44} rx={4} fill={colors.greyLight} />
      <Rect x={20} y={30} width={20} height={3} rx={1.5} fill={colors.greyDark} />
      <Rect x={20} y={38} width={40} height={3} rx={1.5} fill={colors.grey} />
      <Rect x={20} y={46} width={32} height={3} rx={1.5} fill={colors.grey} />
      <Circle cx={56} cy={24} r={10} fill={colors.white} stroke={colors.grey} strokeWidth={1.5} />
      <Path
        d="M52 24l2.5 2.5L60 20"
        stroke={colors.greyDark}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  illustration,
  title,
  description,
  action,
  secondaryAction,
  testID,
}) => {
  return (
    <View style={styles.wrapper} testID={testID} accessibilityRole="none">
      <View style={styles.illustration} accessibilityElementsHidden>
        {illustration ?? <DefaultIllustration />}
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {(action || secondaryAction) && (
        <View style={styles.actions}>
          {action}
          {secondaryAction}
        </View>
      )}
    </View>
  );
};

EmptyState.displayName = 'EmptyState';
