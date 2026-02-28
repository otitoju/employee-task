import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../../contexts/ThemeContext';

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  animationType?: 'fadeIn' | 'slideUp' | 'scale' | 'none';
  delay?: number;
  testID?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onPress,
  style,
  padding = 'md',
  shadow = true,
  animationType = 'fadeIn',
  delay = 0,
  testID,
}) => {
  const { colors, isDark } = useTheme();
  
  const opacity = useSharedValue(animationType === 'none' ? 1 : 0);
  const translateY = useSharedValue(animationType === 'slideUp' ? 20 : 0);
  const scale = useSharedValue(animationType === 'scale' ? 0.8 : 1);
  const pressed = useSharedValue(false);

  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: 8 },
    md: { padding: 16 },
    lg: { padding: 24 },
  };

  const cardStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...paddingStyles[padding],
    ...(shadow && {
      shadowColor: isDark ? '#000000' : '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  };

  useEffect(() => {
    if (animationType !== 'none') {
      const timer = setTimeout(() => {
        opacity.value = withTiming(1, { duration: 400 });
        translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
        scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [animationType, delay, opacity, translateY, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleValue = pressed.value 
      ? interpolate(scale.value, [0.8, 1], [0.95, 0.98])
      : scale.value;

    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scaleValue },
      ],
    };
  });

  const gesture = Gesture.Tap()
    .onBegin(() => {
      if (onPress) {
        pressed.value = true;
      }
    })
    .onFinalize(() => {
      if (onPress) {
        pressed.value = false;
        runOnJS(onPress)();
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[cardStyle, style, animatedStyle]}
        testID={testID}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
};