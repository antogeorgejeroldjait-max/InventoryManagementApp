import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { CartDetailsScreen } from './src/screens/CartDetailsScreen';
import { StockGraphScreen } from './src/screens/StockGraphScreen';
import { PaymentScreen } from './src/screens/PaymentScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Stock Market',
          }}
        />
        <Stack.Screen
          name="CartDetails"
          component={CartDetailsScreen}
          options={{
            title: 'Stock Details',
            animation: 'fade', // ✅ instead of animationEnabled
          }}
        />
        <Stack.Screen
          name="StockGraph"
          component={StockGraphScreen}
          options={{
            title: 'Stock Graph',
            animation: 'slide_from_bottom', // ✅ another valid animation
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            title: 'Payment',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
