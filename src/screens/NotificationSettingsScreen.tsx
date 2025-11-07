import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  stockAlerts: boolean;
  marketUpdates: boolean;
  transactionUpdates: boolean;
  weeklyReport: boolean;
}

export const NotificationSettingsScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    stockAlerts: true,
    marketUpdates: false,
    transactionUpdates: true,
    weeklyReport: true,
  });

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationOptions = [
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive updates via email',
      icon: '📧',
    },
    {
      id: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Receive app notifications',
      icon: '🔔',
    },
    {
      id: 'stockAlerts',
      title: 'Stock Price Alerts',
      description: 'Alert when stock price changes',
      icon: '📈',
    },
    {
      id: 'marketUpdates',
      title: 'Market Updates',
      description: 'Daily market summary',
      icon: '📊',
    },
    {
      id: 'transactionUpdates',
      title: 'Transaction Updates',
      description: 'Confirmation for trades',
      icon: '✅',
    },
    {
      id: 'weeklyReport',
      title: 'Weekly Report',
      description: 'Portfolio summary report',
      icon: '📋',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🔔</Text>
          <Text style={styles.infoText}>
            Manage how you receive notifications from our app
          </Text>
        </View>

        {/* Notification Settings Cards */}
        <View style={styles.settingsContainer}>
          {notificationOptions.map((option) => (
            <View key={option.id} style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingIcon}>{option.icon}</Text>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingDescription}>
                    {option.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={settings[option.id as keyof NotificationSettings]}
                onValueChange={() =>
                  toggleSetting(option.id as keyof NotificationSettings)
                }
                trackColor={{ false: '#e5e7eb', true: '#a3e635' }}
                thumbColor={
                  settings[option.id as keyof NotificationSettings]
                    ? '#22c55e'
                    : '#f3f4f6'
                }
              />
            </View>
          ))}
        </View>

        {/* Alert Preferences */}
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Alert Frequency</Text>

          <TouchableOpacity style={styles.frequencyOption}>
            <View style={styles.radioButton}>
              <View style={styles.radioButtonInner} />
            </View>
            <Text style={styles.frequencyLabel}>Immediate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.frequencyOption}>
            <View style={styles.radioButton}>
              <View style={styles.radioButtonInner} />
            </View>
            <Text style={styles.frequencyLabel}>Hourly Digest</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.frequencyOption}>
            <View style={styles.radioButton}>
              <View style={styles.radioButtonInner} />
            </View>
            <Text style={styles.frequencyLabel}>Daily Digest</Text>
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset to Default</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#1e40af',
    fontWeight: '500',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  frequencyLabel: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#f9fafb',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
