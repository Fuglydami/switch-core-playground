import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { ButtonBaseProps } from '@switch/types';
import { styles, colors } from './Button.styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ButtonProps extends ButtonBaseProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function getVariantStyleKey(
  variant: string,
  colorScheme: string
): keyof typeof styles {
  const scheme =
    colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1);
  return `${variant}${scheme}` as keyof typeof styles;
}

function isLightLabel(variant: string): boolean {
  return variant === 'primary';
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      colorScheme = 'activeBlue',
      size = 'large',
      isLoading = false,
      disabled = false,
      onPress,
      children,
      leftIcon,
      rightIcon,
    },
    ref
  ) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const variantKey = getVariantStyleKey(variant, colorScheme);
    const lightLabel = isLightLabel(variant);

    const labelColor =
      lightLabel
        ? colors.white
        : colorScheme === 'activeBlue'
        ? colors.popBlue
        : colors.pryBlue;

    return (
      <AnimatedPressable
        ref={ref as React.Ref<View>}
        style={[
          styles.base,
          styles[size],
          styles[variantKey],
          disabled && styles.disabled,
          animatedStyle,
        ]}
        disabled={disabled || isLoading}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withTiming(0.97, { duration: 80 });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 120 });
        }}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || isLoading, busy: isLoading }}
      >
        {isLoading ? (
          <ActivityIndicator color={lightLabel ? colors.white : colors.pryBlue} />
        ) : (
          <>
            {leftIcon}
            <Text
              style={[
                styles.label,
                size === 'small' && styles.labelSmall,
                { color: labelColor },
              ]}
            >
              {children}
            </Text>
            {rightIcon}
          </>
        )}
      </AnimatedPressable>
    );
  }
);

Button.displayName = 'Button';
