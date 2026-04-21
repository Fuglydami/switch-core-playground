import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ChipBaseProps } from '@switch/types';
import { styles } from './Chip.styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ChipProps extends ChipBaseProps {
  /** Optional leading icon or flag (16px) */
  icon?: React.ReactNode;
}

export function Chip({
  label,
  icon,
  count,
  onRemove,
  selected = false,
  onSelect,
  size = 'medium',
  disabled = false,
}: ChipProps) {
  const scale = useSharedValue(1);
  const isSelectable = Boolean(onSelect);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (disabled || !onSelect) return;
    onSelect(!selected);
  };

  const handleRemove = () => {
    if (disabled || !onRemove) return;
    onRemove();
  };

  const chipContent = (
    <>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.label,
          size === 'small' && styles.labelSmall,
          selected && styles.labelSelected,
        ]}
      >
        {label}
      </Text>
      {count !== undefined && (
        <Text
          style={[
            styles.count,
            selected && styles.countSelected,
          ]}
        >
          {count}
        </Text>
      )}
      {onRemove && (
        <Pressable
          onPress={handleRemove}
          style={styles.closeButton}
          accessibilityLabel={`Remove ${label}`}
          accessibilityRole="button"
          disabled={disabled}
        >
          <Text
            style={[
              styles.closeText,
              selected && styles.closeTextSelected,
            ]}
          >
            {'\u2715'}
          </Text>
        </Pressable>
      )}
    </>
  );

  if (isSelectable) {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={() => {
          scale.value = withTiming(0.95, { duration: 80 });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 120 });
        }}
        disabled={disabled}
        style={[
          styles.chip,
          styles[size],
          selected && styles.selected,
          disabled && styles.disabled,
          animatedStyle,
        ]}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: selected,
          disabled,
        }}
      >
        {chipContent}
      </AnimatedPressable>
    );
  }

  return (
    <View
      style={[
        styles.chip,
        styles[size],
        selected && styles.selected,
        disabled && styles.disabled,
      ]}
      accessibilityState={{ disabled }}
    >
      {chipContent}
    </View>
  );
}
