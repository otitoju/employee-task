import React from 'react';
import { TouchableOpacity, Text, Animated, ViewStyle } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  testID?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  style,
  testID,
}) => {
  const { isDark, toggleTheme, colors } = useTheme();

  const sizeStyles = {
    sm: { fontSize: 16 },
    md: { fontSize: 20 },
    lg: { fontSize: 24 },
  };

  const buttonStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={toggleTheme}
      activeOpacity={0.7}
      testID={testID}
    >
      {isDark ? (
        <Sun size={sizeStyles[size].fontSize} color={colors.text} />
      ) : (
        <Moon size={sizeStyles[size].fontSize} color={colors.text} />
      )}
    </TouchableOpacity>
  );
};