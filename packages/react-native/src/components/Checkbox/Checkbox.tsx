import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { styles, colors } from './Checkbox.styles';

// ── Checkbox ───────────────────────────────────────────────────────────────

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  variant?: 'square' | 'circle';
  size?: 16 | 20 | 24;
  indeterminate?: boolean;
  disabled?: boolean;
  testID?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  variant = 'square',
  size = 20,
  indeterminate = false,
  disabled = false,
  testID,
}) => {
  const progress = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, { duration: 150 });
  }, [checked, progress]);

  const animatedControlStyle = useAnimatedStyle(() => ({
    backgroundColor:
      progress.value > 0.5 ? colors.popBlue : colors.white,
    borderColor:
      progress.value > 0.5 ? colors.popBlue : colors.greyDark,
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.5, 1]) }],
  }));

  const handlePress = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const sizeStyles = { 16: styles.size16, 20: styles.size20, 24: styles.size24 };
  const sizeStyle = sizeStyles[size];
  const variantStyle = variant === 'square' ? styles.square : styles.circle;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      testID={testID}
      style={[styles.wrapper, disabled && styles.disabled]}
    >
      <Animated.View
        style={[styles.control, sizeStyle, variantStyle, animatedControlStyle]}
      >
        <Animated.View style={animatedCheckStyle}>
          {indeterminate ? (
            <Svg width={size * 0.5} height={2} viewBox="0 0 10 2">
              <Path
                d="M1 1h8"
                stroke={colors.white}
                strokeWidth={1.75}
                strokeLinecap="round"
              />
            </Svg>
          ) : (
            <Svg width={size * 0.5} height={size * 0.4} viewBox="0 0 10 8">
              <Path
                d="M1 4l2.5 3L9 1"
                stroke={colors.white}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </Animated.View>
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

Checkbox.displayName = 'Checkbox';

// ── Radio ──────────────────────────────────────────────────────────────────

export interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  size?: 16 | 20 | 24;
  disabled?: boolean;
  testID?: string;
}

export const Radio: React.FC<RadioProps> = ({
  checked = false,
  onChange,
  label,
  size = 20,
  disabled = false,
  testID,
}) => {
  const progress = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, { duration: 150 });
  }, [checked, progress]);

  const animatedControlStyle = useAnimatedStyle(() => ({
    borderColor: progress.value > 0.5 ? colors.popBlue : colors.greyDark,
  }));

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: progress.value }],
    backgroundColor: colors.popBlue,
  }));

  const handlePress = () => {
    if (!disabled && !checked) {
      onChange?.(true);
    }
  };

  const sizeStyles = { 16: styles.size16, 20: styles.size20, 24: styles.size24 };
  const dotSizeStyles = { 16: styles.radioDotSize16, 20: styles.radioDotSize20, 24: styles.radioDotSize24 };
  const sizeStyle = sizeStyles[size];
  const dotSizeStyle = dotSizeStyles[size];

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      testID={testID}
      style={[styles.wrapper, disabled && styles.disabled]}
    >
      <Animated.View
        style={[styles.control, sizeStyle, styles.circle, animatedControlStyle]}
      >
        <Animated.View
          style={[styles.radioDot, dotSizeStyle, animatedDotStyle]}
        />
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

Radio.displayName = 'Radio';

// ── Toggle ─────────────────────────────────────────────────────────────────

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  testID?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label,
  size = 'medium',
  disabled = false,
  testID,
}) => {
  const progress = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, { duration: 200 });
  }, [checked, progress]);

  const trackWidths = { small: 36, medium: 44, large: 52 };
  const thumbSizes = { small: 16, medium: 20, large: 22 };
  const paddings = { small: 2, medium: 2, large: 3 };

  const trackWidth = trackWidths[size];
  const thumbSize = thumbSizes[size];
  const padding = paddings[size];
  const translateDistance = trackWidth - thumbSize - padding * 2;

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor:
      progress.value > 0.5 ? colors.popBlue : colors.grey,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [0, translateDistance]) },
    ],
  }));

  const handlePress = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const trackSizeStyles = { small: styles.trackSmall, medium: styles.trackMedium, large: styles.trackLarge };
  const thumbSizeStyles = { small: styles.thumbSmall, medium: styles.thumbMedium, large: styles.thumbLarge };
  const trackSizeStyle = trackSizeStyles[size];
  const thumbSizeStyle = thumbSizeStyles[size];

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      testID={testID}
      style={[styles.wrapper, disabled && styles.disabled]}
    >
      <Animated.View style={[styles.track, trackSizeStyle, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, thumbSizeStyle, animatedThumbStyle]} />
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

Toggle.displayName = 'Toggle';
