import React, { memo } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Employee } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from '../common';
import { AnimatedCard } from '../common/AnimatedCard';
import { capitalizeWords } from '../../utils';
import { useSlideUp } from '../../hooks/useAnimations';

interface EmployeeCardProps {
  employee: Employee;
  onPress: (employee: Employee) => void;
  style?: ViewStyle;
  index?: number;
  testID?: string;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = memo(({
  employee,
  onPress,
  style,
  index = 0,
  testID,
}) => {
  const { colors } = useTheme();

  const nameStyle: TextStyle = {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  };

  const titleStyle: TextStyle = {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  };

  const departmentStyle: TextStyle = {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  };

  const emailStyle: TextStyle = {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  };

  return (
    <AnimatedCard
      onPress={() => onPress(employee)}
      style={[{ marginBottom: 12 }, style]}
      animationType="slideUp"
      delay={index * 50}
      testID={testID}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          imageUri={employee.image}
          firstName={employee.firstName}
          lastName={employee.lastName}
          size="md"
        />
        
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={nameStyle}>
            {`${employee.firstName} ${employee.lastName}`}
          </Text>
          
          {employee.company?.title && (
            <Text style={titleStyle}>
              {capitalizeWords(employee.company.title)}
            </Text>
          )}
          
          {employee.company?.department && (
            <Text style={departmentStyle}>
              {capitalizeWords(employee.company.department)}
            </Text>
          )}
          
          <Text style={emailStyle} numberOfLines={1}>
            {employee.email}
          </Text>
        </View>
      </View>
    </AnimatedCard>
  );
});