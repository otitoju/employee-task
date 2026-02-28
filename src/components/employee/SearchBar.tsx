import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from '../common';
import { useTheme } from '../../contexts/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  testID?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search employees...',
  testID,
}) => {
  const { colors } = useTheme();

  const SearchIcon = () => (
    <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.textSecondary, fontSize: 16 }}>🔍</Text>
    </View>
  );

  const ClearIcon = () => (
    <TouchableOpacity
      onPress={onClear}
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.textSecondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: colors.surface, fontSize: 12, fontWeight: 'bold' }}>✕</Text>
    </TouchableOpacity>
  );

  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      leftIcon={<SearchIcon />}
      rightIcon={value ? <ClearIcon /> : undefined}
      onRightIconPress={value ? onClear : undefined}
      autoCapitalize="none"
      autoCorrect={false}
      style={{ marginBottom: 0 }}
      testID={testID}
    />
  );
};