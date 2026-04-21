import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { styles, colors } from './Loader.styles';

// ── Ring Loader ────────────────────────────────────────────────────────────

export type LoaderSize = 'small' | 'medium' | 'large';

export interface RingLoaderProps {
  /** 0–100. When 100 shows a check icon. */
  progress?: number;
  size?: LoaderSize;
  testID?: string;
}

export const RingLoader: React.FC<RingLoaderProps> = ({
  progress,
  size = 'medium',
  testID,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (progress !== 100) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [progress, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const isComplete = progress === 100;

  const ringSizeStyles = { small: styles.ringSmall, medium: styles.ringMedium, large: styles.ringLarge };
  const sizeStyle = ringSizeStyles[size];

  if (isComplete) {
    const iconSize = size === 'small' ? 12 : size === 'medium' ? 20 : 28;
    return (
      <View
        style={[styles.ring, sizeStyle, styles.complete]}
        accessibilityRole="image"
        accessibilityLabel="Complete"
        testID={testID}
      >
        <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5 12l4.5 4.5L19 7"
            stroke={colors.white}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    );
  }

  return (
    <Animated.View
      style={[styles.ring, sizeStyle, animatedStyle]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: progress,
      }}
      testID={testID}
    />
  );
};

RingLoader.displayName = 'RingLoader';

// ── Progress Bar ───────────────────────────────────────────────────────────

export interface ProgressBarProps {
  /** 0–100 */
  value: number;
  size?: 'thin' | 'medium' | 'thick';
  /** Label shown on left */
  label?: string;
  /** Label shown on right (defaults to percentage) */
  trailingLabel?: string;
  /** Show percentage on right */
  showPercent?: boolean;
  testID?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'medium',
  label,
  trailingLabel,
  showPercent = false,
  testID,
}) => {
  const pct = Math.min(100, Math.max(0, value));
  const right = trailingLabel ?? (showPercent ? `${Math.round(pct)}%` : undefined);

  const trackSizeStyles = { thin: styles.trackThin, medium: styles.trackMedium, thick: styles.trackThick };
  const trackSizeStyle = trackSizeStyles[size];

  return (
    <View style={styles.progressWrapper} testID={testID}>
      {(label || right) && (
        <View style={styles.progressLabels}>
          {label && <Text style={styles.progressLabel}>{label}</Text>}
          {right && <Text style={styles.progressLabel}>{right}</Text>}
        </View>
      )}
      <View
        style={[styles.track, trackSizeStyle]}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: pct }}
        accessibilityLabel={label ?? 'Progress'}
      >
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
};

ProgressBar.displayName = 'ProgressBar';

// ── Step Progress ──────────────────────────────────────────────────────────

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
}

export type StepStatus = 'completed' | 'active' | 'pending';

export interface StepProgressProps {
  steps: ProgressStep[];
  /** Index of the current active step (0-based) */
  activeIndex: number;
  /** 'horizontal' (default) or 'vertical' */
  orientation?: 'horizontal' | 'vertical';
  testID?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  activeIndex,
  orientation = 'horizontal',
  testID,
}) => {
  const getStatus = (i: number): StepStatus => {
    if (i < activeIndex) return 'completed';
    if (i === activeIndex) return 'active';
    return 'pending';
  };

  const isVertical = orientation === 'vertical';

  return (
    <View
      style={[styles.stepList, isVertical && styles.stepListVertical]}
      accessibilityLabel="Progress steps"
      testID={testID}
    >
      {steps.map((step, i) => {
        const status = getStatus(i);
        const isLast = i === steps.length - 1;

        return (
          <View
            key={step.id}
            style={[styles.step, isVertical && styles.stepVertical]}
            accessibilityState={status === 'active' ? { selected: true } : undefined}
          >
            <View
              style={[
                styles.stepIndicator,
                status === 'active' && styles.stepIndicatorActive,
                status === 'completed' && styles.stepIndicatorCompleted,
              ]}
            >
              {status === 'completed' ? (
                <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                  <Path
                    d="M2 6l2.5 3L10 3"
                    stroke={colors.white}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    status === 'active' && styles.stepNumberActive,
                  ]}
                >
                  {i + 1}
                </Text>
              )}
            </View>

            {!isLast && !isVertical && (
              <View
                style={[
                  styles.connector,
                  status === 'completed' && styles.connectorDone,
                ]}
              />
            )}

            {isVertical && (
              <View style={styles.stepText}>
                <Text
                  style={[
                    styles.stepLabel,
                    status === 'pending' && styles.stepLabelPending,
                  ]}
                >
                  {step.label}
                </Text>
                {step.description && (
                  <Text style={styles.stepDescription}>{step.description}</Text>
                )}
              </View>
            )}

            {!isLast && isVertical && (
              <View
                style={[
                  styles.connector,
                  styles.connectorVertical,
                  status === 'completed' && styles.connectorDone,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

StepProgress.displayName = 'StepProgress';
