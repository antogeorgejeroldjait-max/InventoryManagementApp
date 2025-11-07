// src/screens/RoleSelectScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRole } from '../context/RoleContext';

interface Props {
  navigation: any;
}

export const RoleSelectScreen: React.FC<Props> = ({ navigation }) => {
  const { setUserRole } = useRole();

  const handleSelectRole = (role: 'user' | 'admin') => {
    // Fix: Context state update pannanum
    setUserRole(role);
    // Navigation automatically happen aagum - no need replace call
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Stock Market Pro</Text>
          <Text style={styles.subtitle}>Select Your Role</Text>
        </View>

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          {/* User Button */}
          <TouchableOpacity
            style={[styles.roleButton, styles.userButton]}
            activeOpacity={0.8}
            onPress={() => handleSelectRole('user')}
          >
            <Ionicons name="person-circle" size={60} color="#3b82f6" />
            <Text style={styles.roleTitle}>User</Text>
            <Text style={styles.roleDescription}>Browse & Buy Stocks</Text>
          </TouchableOpacity>

          {/* Admin Button */}
          <TouchableOpacity
            style={[styles.roleButton, styles.adminButton]}
            activeOpacity={0.8}
            onPress={() => handleSelectRole('admin')}
          >
            <Ionicons name="shield-checkmark" size={60} color="#10b981" />
            <Text style={styles.roleTitle}>Admin</Text>
            <Text style={styles.roleDescription}>Manage Products</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
        marginTop: StatusBar.currentHeight || 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  buttonsContainer: {
    width: '100%',
    gap: 20,
  },
  roleButton: {
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userButton: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  adminButton: {
    backgroundColor: '#d1fae5',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    color: '#1f2937',
  },
  roleDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
});
