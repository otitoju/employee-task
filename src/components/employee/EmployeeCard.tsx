import React, { memo } from 'react';
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Employee } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar, Card } from '../common';
import { capitalizeWords } from '../../utils';

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
    <Card
      onPress={() => onPress(employee)}
      style={StyleSheet.flatten([{ marginBottom: 12 }, style])}
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
    </Card>
  );
});