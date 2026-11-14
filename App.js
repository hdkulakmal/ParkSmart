import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const AppContext = createContext(null);

function useAppData() {
  return useContext(AppContext);
}

const parkingData = [
  {
    id: 1,
    name: 'City Center Parking',
    location: 'Colombo 03',
    price: 150,
    available: 24,
    distance: '0.8 km',
    color: '#2563EB',
  },
  {
    id: 2,
    name: 'Liberty Plaza Parking',
    location: 'Colombo 03',
    price: 200,
    available: 12,
    distance: '1.2 km',
    color: '#7C3AED',
  },
  {
    id: 3,
    name: 'Galle Face Car Park',
    location: 'Colombo 01',
    price: 100,
    available: 31,
    distance: '2.1 km',
    color: '#059669',
  },
];

function HomeScreen({ navigation }) {
  const { bookings, favourites } = useAppData();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" />

      <View style={styles.hero}>
        <Text style={styles.smallLight}>WELCOME BACK</Text>
        <Text style={styles.heroTitle}>ParkSmart</Text>
        <Text style={styles.heroText}>
          Find a better place to park today.
        </Text>

        <Pressable
          style={styles.heroButton}
          onPress={() => navigation.navigate('FindParking')}
        >
          <Text style={styles.heroButtonText}>Find parking spots</Text>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <Stat value="24" label="Available spots" />
        <Stat value={String(bookings.length)} label="My bookings" />
        <Stat value={String(favourites.length)} label="Favourites" />
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>

      <View style={styles.actionRow}>
        <Action title="Find Parking" icon="⌕" onPress={() => navigation.navigate('FindParking')} />
        <Action title="My Bookings" icon="▣" onPress={() => navigation.navigate('MyBookings')} />
      </View>

      <View style={styles.actionRow}>
        <Action title="Favourites" icon="♡" onPress={() => navigation.navigate('Favourites')} />
        <Action title="About" icon="ⓘ" onPress={() => navigation.navigate('About')} />
      </View>

      <Text style={styles.sectionTitle}>Popular nearby</Text>

      {parkingData.slice(0, 2).map((parking) => (
        <ParkingCard
          key={parking.id}
          parking={parking}
          onPress={() => navigation.navigate('ParkingDetails', { parking })}
        />
      ))}
    </ScrollView>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Action({ title, icon, onPress }) {
  return (
    <Pressable style={styles.action} onPress={onPress}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionTitle}>{title}</Text>
    </Pressable>
  );
}

function FindParkingScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      parkingData.filter((item) =>
        `${item.name} ${item.location}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>EXPLORE</Text>
      <Text style={styles.pageTitle}>Find Parking</Text>
      <Text style={styles.description}>
        Search available parking locations near you.
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search by name or location"
        placeholderTextColor="#94A3B8"
        style={styles.searchInput}
      />

      <Text style={styles.sectionTitle}>Available locations</Text>

      {filtered.map((parking) => (
        <ParkingCard
          key={parking.id}
          parking={parking}
          onPress={() => navigation.navigate('ParkingDetails', { parking })}
        />
      ))}

      {filtered.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>⌕</Text>
          <Text style={styles.emptyTitle}>No locations found</Text>
          <Text style={styles.emptyText}>Try another search term.</Text>
        </View>
      )}
    </ScrollView>
  );
}

function ParkingCard({ parking, onPress }) {
  return (
    <Pressable style={styles.parkingCard} onPress={onPress}>
      <View style={[styles.parkingIcon, { backgroundColor: parking.color }]}>
        <Text style={styles.parkingIconText}>P</Text>
      </View>

      <View style={styles.parkingInfo}>
        <Text style={styles.parkingName}>{parking.name}</Text>
        <Text style={styles.muted}>{parking.location}</Text>
        <Text style={styles.available}>{parking.available} spots available</Text>
      </View>

      <View>
        <Text style={styles.price}>Rs. {parking.price}</Text>
        <Text style={styles.muted}>{parking.distance}</Text>
      </View>
    </Pressable>
  );
}

function ParkingDetailsScreen({ route, navigation }) {
  const parking = route.params?.parking || parkingData[0];
  const { favourites, toggleFavourite } = useAppData();
  const isFavourite = favourites.some((item) => item.id === parking.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.banner, { backgroundColor: parking.color }]}>
        <Text style={styles.bannerIcon}>P</Text>
        <Text style={styles.bannerText}>PARKING LOCATION</Text>
      </View>

      <Text style={styles.pageTitle}>{parking.name}</Text>
      <Text style={styles.description}>{parking.location}</Text>

      <View style={styles.detailRow}>
        <Stat value={`Rs.${parking.price}`} label="Per hour" />
        <Stat value={parking.available} label="Available" />
        <Stat value={parking.distance} label="Distance" />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Facilities</Text>
        <Text style={styles.infoText}>✓ 24-hour security</Text>
        <Text style={styles.infoText}>✓ CCTV monitoring</Text>
        <Text style={styles.infoText}>✓ Easy entrance and exit</Text>
      </View>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => toggleFavourite(parking)}
      >
        <Text style={styles.secondaryButtonText}>
          {isFavourite ? '♥ Remove from favourites' : '♡ Add to favourites'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate('BookParking', { parking })}
      >
        <Text style={styles.primaryButtonText}>Reserve this location</Text>
      </Pressable>
    </ScrollView>
  );
}

function BookParkingScreen({ route }) {
  const parking = route.params?.parking || parkingData[0];
  const { addBooking } = useAppData();
  const [vehicle, setVehicle] = useState('');
  const [duration, setDuration] = useState('');
  const [saved, setSaved] = useState(false);

  function confirmBooking() {
    if (!vehicle.trim() || !duration.trim()) return;

    addBooking({
      ...parking,
      vehicle,
      duration,
    });

    setSaved(true);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>RESERVATION</Text>
      <Text style={styles.pageTitle}>Book Parking</Text>

      <View style={styles.bookingBox}>
        <Text style={styles.infoTitle}>{parking.name}</Text>
        <Text style={styles.muted}>{parking.location}</Text>
        <Text style={styles.price}>Rs. {parking.price} / hour</Text>
      </View>

      <Text style={styles.formLabel}>Vehicle number</Text>
      <TextInput
        value={vehicle}
        onChangeText={setVehicle}
        placeholder="Example: ABC-1234"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <Text style={styles.formLabel}>Duration</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        placeholder="Example: 2 hours"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <Pressable style={styles.primaryButton} onPress={confirmBooking}>
        <Text style={styles.primaryButtonText}>
          {saved ? 'Booking saved locally' : 'Confirm booking'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function MyBookingsScreen() {
  const { bookings } = useAppData();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>YOUR ACTIVITY</Text>
      <Text style={styles.pageTitle}>My Bookings</Text>

      {bookings.length === 0 ? (
        <Empty title="No bookings yet" text="Your saved bookings will appear here." />
      ) : (
        bookings.map((booking) => (
          <View key={booking.id} style={styles.infoCard}>
            <Text style={styles.infoTitle}>{booking.parkingName}</Text>
            <Text style={styles.infoText}>{booking.location}</Text>
            <Text style={styles.infoText}>Vehicle: {booking.vehicle}</Text>
            <Text style={styles.infoText}>Duration: {booking.duration}</Text>
            <Text style={styles.muted}>{booking.bookedAt}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

function FavouritesScreen({ navigation }) {
  const { favourites } = useAppData();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>SAVED PLACES</Text>
      <Text style={styles.pageTitle}>Favourites</Text>

      {favourites.length === 0 ? (
        <Empty title="No favourites yet" text="Save locations for quick access." />
      ) : (
        favourites.map((parking) => (
          <ParkingCard
            key={parking.id}
            parking={parking}
            onPress={() => navigation.navigate('ParkingDetails', { parking })}
          />
        ))
      )}
    </ScrollView>
  );
}

function Empty({ title, text }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>♡</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.label}>ABOUT THE APP</Text>
        <Text style={styles.pageTitle}>ParkSmart</Text>
        <Text style={styles.description}>
          ParkSmart helps drivers find and manage parking locations using
          locally stored data. The app works without an internet connection.
        </Text>
      </View>
    </View>
  );
}

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function loadData() {
      const savedBookings = await AsyncStorage.getItem('parkSmartBookings');
      const savedFavourites = await AsyncStorage.getItem('parkSmartFavourites');

      if (savedBookings) setBookings(JSON.parse(savedBookings));
      if (savedFavourites) setFavourites(JSON.parse(savedFavourites));
    }

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('parkSmartBookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    AsyncStorage.setItem('parkSmartFavourites', JSON.stringify(favourites));
  }, [favourites]);

  function addBooking(parking) {
    const booking = {
      id: Date.now().toString(),
      parkingName: parking.name,
      location: parking.location,
      price: parking.price,
      vehicle: parking.vehicle,
      duration: parking.duration,
      bookedAt: new Date().toLocaleString(),
    };

    setBookings((current) => [booking, ...current]);
  }

  function toggleFavourite(parking) {
    setFavourites((current) => {
      const exists = current.some((item) => item.id === parking.id);

      return exists
        ? current.filter((item) => item.id !== parking.id)
        : [...current, parking];
    });
  }

  return (
    <AppContext.Provider value={{ bookings, favourites, addBooking, toggleFavourite }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#102A56' },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: { fontWeight: '700' },
              contentStyle: { backgroundColor: '#F5F7FB' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ParkSmart' }} />
            <Stack.Screen name="FindParking" component={FindParkingScreen} options={{ title: 'Find Parking' }} />
            <Stack.Screen name="ParkingDetails" component={ParkingDetailsScreen} options={{ title: 'Details' }} />
            <Stack.Screen name="BookParking" component={BookParkingScreen} options={{ title: 'Booking' }} />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} options={{ title: 'My Bookings' }} />
            <Stack.Screen name="Favourites" component={FavouritesScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F7FB' },
  content: { padding: 20, paddingBottom: 40 },
  hero: {
    backgroundColor: '#102A56',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  smallLight: {
    color: '#9DBAE5',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 6,
  },
  heroText: {
    color: '#D9E7FA',
    fontSize: 17,
    marginTop: 22,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroButtonText: { color: '#102A56', fontWeight: '800' },
  arrow: { color: '#2563EB', fontSize: 22 },
  statsRow: { flexDirection: 'row', marginBottom: 24 },
  stat: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },
  statValue: { color: '#102A56', fontSize: 20, fontWeight: '800' },
  statLabel: { color: '#718096', fontSize: 11, marginTop: 4 },
  sectionTitle: {
    color: '#102A56',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  actionRow: { flexDirection: 'row', marginBottom: 12 },
  action: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 17,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },
  actionIcon: { color: '#2563EB', fontSize: 25, marginBottom: 10 },
  actionTitle: { color: '#102A56', fontWeight: '800' },
  label: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  pageTitle: {
    color: '#102A56',
    fontSize: 29,
    fontWeight: '800',
    marginBottom: 8,
  },
  description: {
    color: '#718096',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 15,
    color: '#102A56',
    borderWidth: 1,
    borderColor: '#E5EAF2',
    marginBottom: 24,
  },
  parkingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },
  parkingIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  parkingIconText: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' },
  parkingInfo: { flex: 1 },
  parkingName: { color: '#102A56', fontWeight: '800', fontSize: 15 },
  muted: { color: '#718096', fontSize: 12, marginTop: 4 },
  available: { color: '#059669', fontSize: 11, marginTop: 8 },
  price: { color: '#102A56', fontWeight: '800', fontSize: 13 },
  banner: {
    height: 150,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  bannerIcon: { color: '#FFFFFF', fontSize: 52, fontWeight: '900' },
  bannerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  detailRow: { flexDirection: 'row', marginVertical: 14 },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  infoTitle: { color: '#102A56', fontSize: 17, fontWeight: '800', marginBottom: 10 },
  infoText: { color: '#526176', fontSize: 14, marginTop: 8 },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  secondaryButton: {
    backgroundColor: '#E8F0FF',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginBottom: 4,
  },
  secondaryButtonText: { color: '#2563EB', fontWeight: '800' },
  bookingBox: {
    backgroundColor: '#E8F0FF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  formLabel: { color: '#102A56', fontWeight: '800', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF2',
    padding: 15,
    color: '#102A56',
    marginBottom: 18,
  },
  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginTop: 14,
  },
  emptyIcon: { color: '#2563EB', fontSize: 42, marginBottom: 12 },
  emptyTitle: { color: '#102A56', fontSize: 17, fontWeight: '800' },
  emptyText: { color: '#718096', textAlign: 'center', marginTop: 8 },
});