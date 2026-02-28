import React, { useEffect, useMemo, useCallback, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../contexts/ThemeContext';
import { Employee, RootStackParamList } from '../types';
import { debounce } from '../utils';
import { useEmployees } from '../hooks/useEmployees';

import {
  EmployeeCard,
  SearchBar,
  Loading,
  EmployeeCardSkeleton,
  Header,
  Button,
  ThemeToggle,
} from '../components';

type NavigationProp = StackNavigationProp<RootStackParamList, 'EmployeeList'>;

export const EmployeeListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  
  const {
    employees,
    filteredEmployees,
    searchQuery,
    error,
    loadingStates,
    employeeCount,
    fetchEmployees,
    refreshEmployees,
    searchEmployees,
  } = useEmployees();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      searchEmployees(query);
    }, 300),
    [searchEmployees]
  );

  useEffect(() => {
    if (employees.length === 0) {
      fetchEmployees();
    }
  }, [employees.length, fetchEmployees]);

  useEffect(() => {
    debouncedSearch(localSearchQuery);
  }, [localSearchQuery, debouncedSearch]);

  const handleEmployeePress = useCallback((employee: Employee) => {
    navigation.navigate('EmployeeDetail', { employee });
  }, [navigation]);

  const handleRefresh = useCallback(() => {
    refreshEmployees();
  }, [refreshEmployees]);

  const handleSearchChange = useCallback((text: string) => {
    setLocalSearchQuery(text);
  }, []);

  const handleSearchClear = useCallback(() => {
    setLocalSearchQuery('');
    searchEmployees('');
  }, [searchEmployees]);

  const handleRetry = useCallback(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const renderEmployeeCard = useCallback(({ item, index }: { item: Employee; index: number }) => (
    <EmployeeCard
      employee={item}
      onPress={handleEmployeePress}
      index={index}
      testID={`employee-card-${item.id}`}
    />
  ), [handleEmployeePress]);

  const renderSkeletonCard = useCallback(({ index }: { index: number }) => (
    <EmployeeCardSkeleton key={index} />
  ), []);

  const renderEmptyState = useCallback(() => {
    if (loadingStates.isLoading) return null;

    const emptyStyle: TextStyle = {
      textAlign: 'center',
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 40,
      paddingHorizontal: 32,
    };

    if (searchQuery) {
      return (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={emptyStyle}>
            No employees found matching "{searchQuery}"
          </Text>
          <Button
            title="Clear Search"
            onPress={handleSearchClear}
            variant="outline"
            style={{ marginTop: 16 }}
          />
        </View>
      );
    }

    return (
      <Text style={emptyStyle}>
        No employees found. Pull down to refresh.
      </Text>
    );
  }, [loadingStates.isLoading, searchQuery, colors.textSecondary, handleSearchClear]);

  const renderErrorState = useCallback(() => (
    <View style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 32 }}>
      <Text style={{
        textAlign: 'center',
        fontSize: 16,
        color: colors.error,
        marginBottom: 16,
      }}>
        {error}
      </Text>
      <Button
        title="Try Again"
        onPress={handleRetry}
        variant="primary"
      />
    </View>
  ), [error, colors.error, handleRetry]);

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: 16,
  };

  const searchContainerStyle: ViewStyle = {
    paddingVertical: 16,
  };

  if (error && employees.length === 0) {
    return (
      <SafeAreaView style={containerStyle}>
        <Header
          title="Employee Directory"
          rightIcon={<ThemeToggle testID="theme-toggle" />}
        />
        <View style={contentStyle}>
          {renderErrorState()}
        </View>
      </SafeAreaView>
    );
  }

  return (
      <SafeAreaView style={containerStyle}>
        <Header
          title="Employee Directory"
          rightIcon={<ThemeToggle testID="theme-toggle" />}
        />
      
      <View style={contentStyle}>
        <View style={searchContainerStyle}>
          <SearchBar
            value={localSearchQuery}
            onChangeText={handleSearchChange}
            onClear={handleSearchClear}
            testID="employee-search-bar"
          />
        </View>

        {loadingStates.isLoading && employees.length === 0 ? (
          <FlatList
            data={Array.from({ length: 8 })}
            renderItem={renderSkeletonCard}
            keyExtractor={(_, index) => `skeleton-${index}`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={filteredEmployees}
            renderItem={renderEmployeeCard}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={loadingStates.isRefreshing}
                onRefresh={handleRefresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={8}
            windowSize={5}
            initialNumToRender={8}
            updateCellsBatchingPeriod={50}
            getItemLayout={(data, index) => ({
              length: 88, // Approximate height of employee card
              offset: 88 * index,
              index,
            })}
            testID="employee-list"
          />
        )}
      </View>
    </SafeAreaView>
  );
};