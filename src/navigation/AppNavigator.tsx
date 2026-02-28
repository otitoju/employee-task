import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from '../types';
import { EmployeeListScreen, EmployeeDetailScreen } from '../screens';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  const navigationTheme = {
    ...( isDark ? DarkTheme : DefaultTheme ),
    colors: {
      ...( isDark ? DarkTheme.colors : DefaultTheme.colors ),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // We'll use our custom header
          cardStyle: { backgroundColor: colors.background },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen
          name="EmployeeList"
          component={EmployeeListScreen}
        />
        <Stack.Screen
          name="EmployeeDetail"
          component={EmployeeDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};