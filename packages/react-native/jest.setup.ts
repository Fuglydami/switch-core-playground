import '@testing-library/react-native/build/matchers/extend-expect';

// Animation builder helper for Reanimated
const createAnimationBuilder = () => {
  const builder = {
    duration: () => builder,
    delay: () => builder,
    springify: () => builder,
    damping: () => builder,
    mass: () => builder,
    stiffness: () => builder,
    overshootClamping: () => builder,
    restDisplacementThreshold: () => builder,
    restSpeedThreshold: () => builder,
    withInitialValues: () => builder,
    withCallback: () => builder,
    build: () => builder,
  };
  return builder;
};

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const { View, Text, Image, ScrollView } = require('react-native');
  const createAnimatedComponent = (comp: unknown) => comp;
  return {
    __esModule: true,
    default: {
      View,
      Text,
      Image,
      ScrollView,
      createAnimatedComponent,
    },
    createAnimatedComponent,
    useSharedValue: (init: unknown) => ({ value: init }),
    useAnimatedStyle: (fn: () => unknown) => fn(),
    useDerivedValue: (fn: () => unknown) => ({ value: fn() }),
    withTiming: (val: unknown) => val,
    withSpring: (val: unknown) => val,
    withDelay: (_: number, val: unknown) => val,
    withSequence: (...args: unknown[]) => args[args.length - 1],
    withRepeat: (val: unknown) => val,
    interpolate: (value: number, inputRange: number[], outputRange: number[]) => {
      // Simple linear interpolation
      const i = inputRange.findIndex((v, idx) => idx < inputRange.length - 1 && value >= v && value <= inputRange[idx + 1]);
      if (i === -1) return outputRange[value <= inputRange[0] ? 0 : outputRange.length - 1];
      const ratio = (value - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
      return outputRange[i] + ratio * (outputRange[i + 1] - outputRange[i]);
    },
    runOnJS: (fn: unknown) => fn,
    runOnUI: (fn: unknown) => fn,
    Easing: {
      linear: (x: number) => x,
      ease: (x: number) => x,
      inOut: () => (x: number) => x,
    },
    FadeIn: createAnimationBuilder(),
    FadeOut: createAnimationBuilder(),
    FadeInDown: createAnimationBuilder(),
    FadeOutDown: createAnimationBuilder(),
    FadeInUp: createAnimationBuilder(),
    FadeOutUp: createAnimationBuilder(),
    SlideInDown: createAnimationBuilder(),
    SlideOutDown: createAnimationBuilder(),
    SlideInUp: createAnimationBuilder(),
    SlideOutUp: createAnimationBuilder(),
    Layout: createAnimationBuilder(),
  };
});

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock datetimepicker
jest.mock(
  '@react-native-community/datetimepicker',
  () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
      __esModule: true,
      default: (props: { testID?: string }) =>
        React.createElement(View, { testID: props.testID || 'dateTimePicker' }),
    };
  },
  { virtual: true }
);

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');

  const GestureHandlerRootView = ({ children, style }: { children: React.ReactNode; style?: unknown }) =>
    React.createElement(View, { style }, children);

  const GestureDetector = ({ children }: { children: React.ReactNode }) => children;

  const createGestureBuilder = () => {
    const gesture = {
      enabled: () => gesture,
      onBegin: () => gesture,
      onStart: () => gesture,
      onUpdate: () => gesture,
      onEnd: () => gesture,
      onFinalize: () => gesture,
      withTestId: () => gesture,
    };
    return gesture;
  };

  return {
    __esModule: true,
    GestureHandlerRootView,
    GestureDetector,
    Gesture: {
      Pan: createGestureBuilder,
      Tap: createGestureBuilder,
      LongPress: createGestureBuilder,
      Pinch: createGestureBuilder,
      Rotation: createGestureBuilder,
      Fling: createGestureBuilder,
      Race: (...gestures: unknown[]) => gestures[0],
      Simultaneous: (...gestures: unknown[]) => gestures[0],
      Exclusive: (...gestures: unknown[]) => gestures[0],
    },
    State: {
      UNDETERMINED: 0,
      FAILED: 1,
      BEGAN: 2,
      CANCELLED: 3,
      ACTIVE: 4,
      END: 5,
    },
    Directions: {
      RIGHT: 1,
      LEFT: 2,
      UP: 4,
      DOWN: 8,
    },
  };
});

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  const createMockComponent = (name: string) =>
    React.forwardRef((props: Record<string, unknown>, ref: unknown) =>
      React.createElement(View, { ...props, ref, testID: props.testID || name })
    );
  return {
    __esModule: true,
    default: createMockComponent('Svg'),
    Svg: createMockComponent('Svg'),
    Circle: createMockComponent('Circle'),
    Ellipse: createMockComponent('Ellipse'),
    G: createMockComponent('G'),
    Text: createMockComponent('SvgText'),
    TSpan: createMockComponent('TSpan'),
    TextPath: createMockComponent('TextPath'),
    Path: createMockComponent('Path'),
    Polygon: createMockComponent('Polygon'),
    Polyline: createMockComponent('Polyline'),
    Line: createMockComponent('Line'),
    Rect: createMockComponent('Rect'),
    Use: createMockComponent('Use'),
    Image: createMockComponent('SvgImage'),
    Symbol: createMockComponent('Symbol'),
    Defs: createMockComponent('Defs'),
    LinearGradient: createMockComponent('LinearGradient'),
    RadialGradient: createMockComponent('RadialGradient'),
    Stop: createMockComponent('Stop'),
    ClipPath: createMockComponent('ClipPath'),
    Pattern: createMockComponent('Pattern'),
    Mask: createMockComponent('Mask'),
  };
});
