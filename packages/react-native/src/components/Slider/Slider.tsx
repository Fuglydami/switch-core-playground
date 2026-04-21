import React, { useState, useCallback, useRef } from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import type { SliderBaseProps, RangeSliderBaseProps } from '@switch/types';
import { styles } from './Slider.styles';

export interface SliderProps extends SliderBaseProps {
  'aria-label'?: string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  disabled = false,
  showLabels = false,
  formatLabel,
  size = 'large',
  'aria-label': ariaLabel,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const [trackWidth, setTrackWidth] = useState(0);
  const isActive = useSharedValue(false);
  const thumbScale = useSharedValue(1);

  const fmt = formatLabel ?? ((v: number) => String(v));
  const pct = ((value - min) / (max - min)) * 100;

  const clamp = useCallback(
    (val: number) => Math.min(max, Math.max(min, Math.round(val / step) * step)),
    [min, max, step]
  );

  const updateValue = useCallback(
    (x: number) => {
      if (trackWidth === 0) return;
      const ratio = Math.max(0, Math.min(1, x / trackWidth));
      const newValue = clamp(min + ratio * (max - min));
      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [trackWidth, min, max, clamp, onChange]
  );

  const handleLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onBegin(() => {
      isActive.value = true;
      thumbScale.value = withTiming(1.15, { duration: 100 });
    })
    .onUpdate((e) => {
      runOnJS(updateValue)(e.x);
    })
    .onFinalize(() => {
      isActive.value = false;
      thumbScale.value = withTiming(1, { duration: 100 });
    });

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onEnd((e) => {
      runOnJS(updateValue)(e.x);
    });

  const gesture = Gesture.Race(panGesture, tapGesture);

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -10 },
      { translateY: size === 'small' ? -6 : -7 },
      { scale: thumbScale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <View style={[disabled && styles.disabled]}>
        <GestureDetector gesture={gesture}>
          <View
            style={[
              styles.track,
              size === 'small' ? styles.trackSmall : styles.trackLarge,
            ]}
            onLayout={handleLayout}
          >
            <View style={[styles.fill, { width: `${pct}%` }]} />
            <Animated.View
              style={[
                styles.thumb,
                size === 'small' && styles.thumbSmall,
                disabled && styles.thumbDisabled,
                { left: `${pct}%` },
                thumbAnimatedStyle,
              ]}
              accessibilityRole="adjustable"
              accessibilityLabel={ariaLabel}
              accessibilityValue={{
                min,
                max,
                now: value,
              }}
            />
          </View>
        </GestureDetector>
        {showLabels && (
          <View style={styles.labels}>
            <Text style={styles.labelText}>{fmt(min)}</Text>
            <Text style={styles.labelText}>{fmt(max)}</Text>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

// Range Slider (dual handle)

export interface RangeSliderProps extends RangeSliderBaseProps {}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = [0, 100],
  onChange,
  disabled = false,
  showLabels = false,
  formatLabel,
  size = 'large',
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue);
  const [low, high] = controlledValue ?? internalValue;
  const [trackWidth, setTrackWidth] = useState(0);
  const activeThumb = useRef<'low' | 'high' | null>(null);
  const lowScale = useSharedValue(1);
  const highScale = useSharedValue(1);

  const fmt = formatLabel ?? ((v: number) => String(v));
  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  const clamp = useCallback(
    (val: number) => Math.min(max, Math.max(min, Math.round(val / step) * step)),
    [min, max, step]
  );

  const updateLow = useCallback(
    (x: number) => {
      if (trackWidth === 0) return;
      const ratio = Math.max(0, Math.min(1, x / trackWidth));
      const newValue = Math.min(clamp(min + ratio * (max - min)), high - step);
      const pair: [number, number] = [newValue, high];
      setInternalValue(pair);
      onChange?.(pair);
    },
    [trackWidth, min, max, high, step, clamp, onChange]
  );

  const updateHigh = useCallback(
    (x: number) => {
      if (trackWidth === 0) return;
      const ratio = Math.max(0, Math.min(1, x / trackWidth));
      const newValue = Math.max(clamp(min + ratio * (max - min)), low + step);
      const pair: [number, number] = [low, newValue];
      setInternalValue(pair);
      onChange?.(pair);
    },
    [trackWidth, min, max, low, step, clamp, onChange]
  );

  const handleLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const determineThumb = (x: number) => {
    const lowPos = (lowPct / 100) * trackWidth;
    const highPos = (highPct / 100) * trackWidth;
    return Math.abs(x - lowPos) < Math.abs(x - highPos) ? 'low' : 'high';
  };

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onBegin((e) => {
      const thumb = determineThumb(e.x);
      activeThumb.current = thumb;
      if (thumb === 'low') {
        lowScale.value = withTiming(1.15, { duration: 100 });
      } else {
        highScale.value = withTiming(1.15, { duration: 100 });
      }
    })
    .onUpdate((e) => {
      if (activeThumb.current === 'low') {
        runOnJS(updateLow)(e.x);
      } else {
        runOnJS(updateHigh)(e.x);
      }
    })
    .onFinalize(() => {
      lowScale.value = withTiming(1, { duration: 100 });
      highScale.value = withTiming(1, { duration: 100 });
      activeThumb.current = null;
    });

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onEnd((e) => {
      const thumb = determineThumb(e.x);
      if (thumb === 'low') {
        runOnJS(updateLow)(e.x);
      } else {
        runOnJS(updateHigh)(e.x);
      }
    });

  const gesture = Gesture.Race(panGesture, tapGesture);

  const lowThumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -10 },
      { translateY: size === 'small' ? -6 : -7 },
      { scale: lowScale.value },
    ],
  }));

  const highThumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -10 },
      { translateY: size === 'small' ? -6 : -7 },
      { scale: highScale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <View style={[disabled && styles.disabled]}>
        <GestureDetector gesture={gesture}>
          <View
            style={[
              styles.track,
              size === 'small' ? styles.trackSmall : styles.trackLarge,
            ]}
            onLayout={handleLayout}
          >
            <View
              style={[
                styles.rangeFill,
                { left: `${lowPct}%`, width: `${highPct - lowPct}%` },
              ]}
            />
            <Animated.View
              style={[
                styles.thumb,
                size === 'small' && styles.thumbSmall,
                disabled && styles.thumbDisabled,
                { left: `${lowPct}%`, zIndex: 2 },
                lowThumbAnimatedStyle,
              ]}
              accessibilityRole="adjustable"
              accessibilityLabel="Minimum value"
              accessibilityValue={{
                min,
                max: high - step,
                now: low,
              }}
            />
            <Animated.View
              style={[
                styles.thumb,
                size === 'small' && styles.thumbSmall,
                disabled && styles.thumbDisabled,
                { left: `${highPct}%`, zIndex: 2 },
                highThumbAnimatedStyle,
              ]}
              accessibilityRole="adjustable"
              accessibilityLabel="Maximum value"
              accessibilityValue={{
                min: low + step,
                max,
                now: high,
              }}
            />
          </View>
        </GestureDetector>
        {showLabels && (
          <View style={styles.labels}>
            <Text style={styles.labelText}>{fmt(low)}</Text>
            <Text style={styles.labelText}>{fmt(high)}</Text>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
