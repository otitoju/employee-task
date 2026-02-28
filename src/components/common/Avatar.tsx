import React, { useState } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '../../contexts/ThemeContext';
import { getInitials } from '../../utils';

interface AvatarProps {
  imageUri?: string;
  firstName?: string;
  lastName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  testID?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  imageUri,
  firstName = '',
  lastName = '',
  size = 'md',
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);

  const sizeStyles = {
    sm: { width: 32, height: 32, borderRadius: 16 },
    md: { width: 48, height: 48, borderRadius: 24 },
    lg: { width: 64, height: 64, borderRadius: 32 },
    xl: { width: 96, height: 96, borderRadius: 48 },
  };

  const textSizeStyles = {
    sm: { fontSize: 12 },
    md: { fontSize: 16 },
    lg: { fontSize: 20 },
    xl: { fontSize: 32 },
  };

  const containerStyle: ViewStyle = {
    ...sizeStyles[size],
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const textStyle: TextStyle = {
    ...textSizeStyles[size],
    color: '#ffffff',
    fontWeight: '600',
  };

  const imageStyle = {
    ...sizeStyles[size],
  };

  const initials = getInitials(firstName, lastName);

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {imageUri && !imageError ? (
        <Image
          source={{ uri: imageUri }}
          style={imageStyle}
          onError={() => setImageError(true)}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
        />
      ) : (
        <Text style={textStyle}>{initials}</Text>
      )}
    </View>
  );
};