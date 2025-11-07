// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import { RoleSelectScreen } from './src/screens/RoleSelectScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { AdminHomeScreen } from './src/screens/AdminHomeScreen';
import { CreateProductScreen } from './src/screens/CreateProductScreen';
import { CartDetailsScreen } from './src/screens/CartDetailsScreen';
import { StockGraphScreen } from './src/screens/StockGraphScreen';
import { PaymentScreen } from './src/screens/PaymentScreen';
import { TransactionHistoryScreen } from './src/screens/TransactionHistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { NotificationSettingsScreen } from './src/screens/NotificationSettingsScreen';


// Context
import { RoleProvider, useRole } from './src/context/RoleContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ===== USER NAVIGATION =====
const UserHomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="UserHome" component={HomeScreen} />
      <Stack.Screen name="CartDetails" component={CartDetailsScreen} />
      <Stack.Screen name="StockGraph" component={StockGraphScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const UserSearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SearchTab" component={SearchScreen} />
      <Stack.Screen name="CartDetails" component={CartDetailsScreen} />
      <Stack.Screen name="StockGraph" component={StockGraphScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const UserProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
    </Stack.Navigator>
  );
};

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'TransactionHistory') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={UserHomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="SearchTab"
        component={UserSearchStack}
        options={{ title: 'Search' }}
      />
      <Tab.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{ title: 'History' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={UserProfileStack}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// ===== ADMIN NAVIGATION =====
const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
    </Stack.Navigator>
  );
};

// ===== ROOT NAVIGATOR =====
const RootNavigator = () => {
  const { userRole } = useRole();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      {userRole === 'admin' ? (
        <Stack.Screen
          name="AdminScreen"
          component={AdminStack}
          options={{ animation: 'slide_from_right' }}
        />
      ) : userRole === 'user' ? (
        <Stack.Screen
          name="UserScreen"
          component={UserTabNavigator}
          options={{ animation: 'slide_from_right' }}
        />
      ) : (
        <Stack.Screen
          name="RoleSelect"
          component={RoleSelectScreen}
          options={{ animation: 'slide_from_right' }}
        />
      )}
    </Stack.Navigator>
  );
};

// ===== APP ENTRY =====
export default function App() {
  return (
    <RoleProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </RoleProvider>
  );
}
