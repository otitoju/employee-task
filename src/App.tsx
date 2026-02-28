import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store, persistor } from './store';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AppNavigator } from './navigation/AppNavigator';
import { Loading } from './components';

const AppContent: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading text="Loading..." overlay />} persistor={persistor}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};