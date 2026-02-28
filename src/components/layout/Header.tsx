import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const headerStyle: ViewStyle = {
    paddingTop: insets.top,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const titleStyle: TextStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  };

  const iconButtonStyle: ViewStyle = {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <View style={[headerStyle, style]} testID={testID}>
      <TouchableOpacity
        style={iconButtonStyle}
        onPress={onLeftPress}
        disabled={!onLeftPress}
      >
        {leftIcon}
      </TouchableOpacity>

      <Text style={titleStyle}>{title}</Text>

      <TouchableOpacity
        style={iconButtonStyle}
        onPress={onRightPress}
        disabled={!onRightPress}
      >
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};