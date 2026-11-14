import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>ParkSmart</Text>
      <Text style={styles.title}>Parking made simple</Text>
      <Text style={styles.text}>
        Find and manage parking locations easily, even offline.
      </Text>

      <Menu title="Find Parking" subtitle="Search parking locations"
        onPress={() => navigation.navigate('FindParking')} />

      <Menu title="My Bookings" subtitle="View your saved bookings"
        onPress={() => navigation.navigate('MyBookings')} />

      <Menu title="Favourites" subtitle="View favourite locations"
        onPress={() => navigation.navigate('Favourites')} />
    </ScrollView>
  );
}

function Menu({ title, subtitle, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{subtitle}</Text>
    </Pressable>
  );
}

function FindParking({ navigation }) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Find Parking</Text>
      <Text style={styles.text}>Parking locations will appear here.</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ParkingDetails')}
      >
        <Text style={styles.buttonText}>View Parking Details</Text>
      </Pressable>
    </View>
  );
}

function ParkingDetails({ navigation }) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>City Center Parking</Text>
      <Text style={styles.text}>Location: Colombo 03</Text>
      <Text style={styles.text}>Price: Rs. 150 per hour</Text>
      <Text style={styles.text}>Available spaces: 24</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('BookParking')}
      >
        <Text style={styles.buttonText}>Book This Parking</Text>
      </Pressable>
    </View>
  );
}

function BookParking() {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Book Parking</Text>
      <Text style={styles.text}>
        Booking form will be added here.
      </Text>
    </View>
  );
}

function MyBookings() {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>My Bookings</Text>
      <Text style={styles.text}>No bookings yet.</Text>
    </View>
  );
}

function Favourites() {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Favourites</Text>
      <Text style={styles.text}>No favourite locations yet.</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#173B75' },
            headerTintColor: '#FFFFFF',
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ title: 'ParkSmart' }} />
          <Stack.Screen name="FindParking" component={FindParking} options={{ title: 'Find Parking' }} />
          <Stack.Screen name="ParkingDetails" component={ParkingDetails} options={{ title: 'Details' }} />
          <Stack.Screen name="BookParking" component={BookParking} options={{ title: 'Book Parking' }} />
          <Stack.Screen name="MyBookings" component={MyBookings} options={{ title: 'My Bookings' }} />
          <Stack.Screen name="Favourites" component={Favourites} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0F5FF',
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F0F5FF',
  },
  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2463EB',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#173B75',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#526176',
    marginBottom: 12,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#DCE5F3',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#173B75',
  },
  cardText: {
    color: '#526176',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#2463EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});