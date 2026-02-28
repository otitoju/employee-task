import React from 'react';
import { View, ActivityIndicator, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface LoadingProps {
  size?: 'small' | 'large';
  text?: string;
  overlay?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  text,
  overlay = false,
  style,
  testID,
}) => {
  const { colors } = useTheme();

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    ...(overlay && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
    }),
  };

  const textStyle: TextStyle = {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  };

  return (
    <View style={[containerStyle, style]} testID={testID}>
      <ActivityIndicator size={size} color={colors.primary} />
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
};

// Skeleton loading component for list items
interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const { colors } = useTheme();

  const skeletonStyle: ViewStyle = {
    width,
    height,
    borderRadius,
    backgroundColor: colors.border,
    opacity: 0.6,
  };

  return <View style={[skeletonStyle, style]} />;
};

// Employee card skeleton
export const EmployeeCardSkeleton: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Skeleton width={48} height={48} borderRadius={24} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
          <Skeleton width="80%" height={14} style={{ marginBottom: 4 }} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
    </View>
  );
};