import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from '../types';
import { makePhoneCall, sendEmail, capitalizeWords, formatPhoneNumber } from '../utils';

import {
  Avatar,
  Card,
  Button,
  Header,
} from '../components';

type RouteProp_ = RouteProp<RootStackParamList, 'EmployeeDetail'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'EmployeeDetail'>;

export const EmployeeDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp_>();
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const { employee } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCall = () => {
    if (employee.phone) {
      makePhoneCall(employee.phone);
    } else {
      Alert.alert('No Phone Number', 'Phone number is not available for this employee.');
    }
  };

  const handleEmail = () => {
    if (employee.email) {
      sendEmail(employee.email);
    } else {
      Alert.alert('No Email', 'Email address is not available for this employee.');
    }
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: 16,
  };

  const headerCardStyle: ViewStyle = {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
  };

  const nameStyle: TextStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  };

  const titleStyle: TextStyle = {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  };

  const departmentStyle: TextStyle = {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  };

  const sectionTitleStyle: TextStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  };

  const infoRowStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  };

  const infoLabelStyle: TextStyle = {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    flex: 1,
  };

  const infoValueStyle: TextStyle = {
    fontSize: 14,
    color: colors.text,
    flex: 2,
    textAlign: 'right',
  };

  const actionButtonsStyle: ViewStyle = {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  };

  const BackIcon = () => (
    <ChevronLeft size={24} color={colors.primary} />
  );

  const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View style={infoRowStyle}>
      <Text style={infoLabelStyle}>{label}</Text>
      <Text style={infoValueStyle} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={containerStyle}>
      <Header
        title="Employee Details"
        leftIcon={<BackIcon />}
        onLeftPress={handleBack}
      />
      
      <ScrollView style={contentStyle} showsVerticalScrollIndicator={false}>
        {/* Header Card with Avatar and Basic Info */}
        <Card style={headerCardStyle}>
          <Avatar
            imageUri={employee.image}
            firstName={employee.firstName}
            lastName={employee.lastName}
            size="xl"
          />
          
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
        </Card>

        {/* Contact Information */}
        <Card style={{ marginBottom: 20 }}>
          <Text style={sectionTitleStyle}>Contact Information</Text>
          
          <InfoRow label="Email" value={employee.email} />
          <InfoRow label="Phone" value={formatPhoneNumber(employee.phone)} />
          
          <View style={actionButtonsStyle}>
            <Button
              title="Call"
              onPress={handleCall}
              variant="primary"
              style={{ flex: 1 }}
              testID="call-button"
            />
            <Button
              title="Email"
              onPress={handleEmail}
              variant="outline"
              style={{ flex: 1 }}
              testID="email-button"
            />
          </View>
        </Card>

        {/* Work Information */}
        <Card style={{ marginBottom: 20 }}>
          <Text style={sectionTitleStyle}>Work Information</Text>
          
          {employee.company?.name && (
            <InfoRow label="Company" value={employee.company.name} />
          )}
          {employee.company?.title && (
            <InfoRow label="Job Title" value={capitalizeWords(employee.company.title)} />
          )}
          {employee.company?.department && (
            <InfoRow label="Department" value={capitalizeWords(employee.company.department)} />
          )}
        </Card>

        {/* Address Information */}
        {employee.address && (
          <Card style={{ marginBottom: 20 }}>
            <Text style={sectionTitleStyle}>Address</Text>
            
            <InfoRow label="Street" value={employee.address.address} />
            <InfoRow label="City" value={employee.address.city} />
            <InfoRow label="State" value={employee.address.state} />
            <InfoRow label="Postal Code" value={employee.address.postalCode} />
          </Card>
        )}
        
        {/* Add some bottom padding for better scrolling */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};