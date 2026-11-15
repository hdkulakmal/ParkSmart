import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ screens, themeMode }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: themeMode === 'dark' ? '#111827' : '#102A56' },
          headerTintColor: '#FFFFFF',
          contentStyle: { backgroundColor: themeMode === 'dark' ? '#111827' : '#F5F7FB' },
        }}
      >
        <Stack.Screen name="Home" component={screens.Home} options={{ title: 'ParkSmart' }} />
        <Stack.Screen name="Role" component={screens.Role} options={{ title: 'Switch Role' }} />
        <Stack.Screen name="AddParking" component={screens.AddParking} options={{ title: 'Add Parking' }} />
        <Stack.Screen name="FindParking" component={screens.FindParking} options={{ title: 'Find Parking' }} />
        <Stack.Screen name="ParkingDetails" component={screens.ParkingDetails} options={{ title: 'Details' }} />
        <Stack.Screen name="BookParking" component={screens.BookParking} options={{ title: 'Booking' }} />
        <Stack.Screen name="MyBookings" component={screens.MyBookings} options={{ title: 'My Bookings' }} />
        <Stack.Screen name="Favourites" component={screens.Favourites} />
        <Stack.Screen name="About" component={screens.About} />
        <Stack.Screen name="Settings" component={screens.Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
