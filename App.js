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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const AppContext = createContext(null);

const parkingDefaults = [
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

function useAppData() {
  return useContext(AppContext);
}

function HomeScreen({ navigation }) {
  const { role } = useAppData();

  return role === 'owner' ? (
    <OwnerHome navigation={navigation} />
  ) : (
    <DriverHome navigation={navigation} />
  );
}

function DriverHome({ navigation }) {
  const { bookings, favourites } = useAppData();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.lightLabel}>DRIVER MODE</Text>
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

      <Pressable
        style={styles.switchButton}
        onPress={() => navigation.navigate('Role')}
      >
        <Text style={styles.switchText}>Switch to Parking Owner mode</Text>
      </Pressable>

      <View style={styles.statsRow}>
        <Stat value="24" label="Available spots" />
        <Stat value={bookings.length} label="My bookings" />
        <Stat value={favourites.length} label="Favourites" />
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
    </ScrollView>
  );
}

function OwnerHome({ navigation }) {
  const { parkingSpots } = useAppData();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.ownerHero}>
        <Text style={styles.lightLabel}>PARKING OWNER MODE</Text>
        <Text style={styles.heroTitle}>Manage your spaces</Text>
        <Text style={styles.heroText}>
          Add your parking location for drivers to discover.
        </Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate('AddParking')}
      >
        <Text style={styles.primaryButtonText}>＋ Add parking spot</Text>
      </Pressable>

      <Pressable
        style={styles.switchButton}
        onPress={() => navigation.navigate('Role')}
      >
        <Text style={styles.switchText}>Switch to Driver mode</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>
        Listed spots ({parkingSpots.length})
      </Text>

      {parkingSpots.map((parking) => (
        <ParkingCard key={parking.id} parking={parking} />
      ))}
    </ScrollView>
  );
}

function RoleScreen({ navigation }) {
  const { setRole } = useAppData();

  function selectRole(role) {
    setRole(role);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.label}>CHOOSE MODE</Text>
        <Text style={styles.pageTitle}>How will you use ParkSmart?</Text>
        <Text style={styles.description}>
          You can switch between these modes whenever you want.
        </Text>

        <Pressable style={styles.roleCard} onPress={() => selectRole('driver')}>
          <Text style={styles.roleIcon}>🚗</Text>
          <Text style={styles.roleTitle}>I am a Driver</Text>
          <Text style={styles.muted}>Find and book parking spaces.</Text>
        </Pressable>

        <Pressable style={styles.roleCard} onPress={() => selectRole('owner')}>
          <Text style={styles.roleIcon}>🏢</Text>
          <Text style={styles.roleTitle}>I am a Parking Owner</Text>
          <Text style={styles.muted}>Add and manage parking spaces.</Text>
        </Pressable>
      </View>
    </View>
  );
}

function AddParkingScreen({ navigation }) {
  const { addParking } = useAppData();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('');

  function saveParking() {
    if (!name || !location || !price || !available) return;

    addParking({
      name,
      location,
      price: Number(price),
      available: Number(available),
      distance: 'New',
      color: '#EA580C',
    });

    navigation.navigate('Home');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>OWNER TOOL</Text>
      <Text style={styles.pageTitle}>Add Parking Spot</Text>

      <Text style={styles.formLabel}>Parking name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Example: My City Parking"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <Text style={styles.formLabel}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Example: Colombo 05"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <Text style={styles.formLabel}>Price per hour</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Example: 150"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <Text style={styles.formLabel}>Available slots</Text>
      <TextInput
        value={available}
        onChangeText={setAvailable}
        keyboardType="numeric"
        placeholder="Example: 20"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <Pressable style={styles.primaryButton} onPress={saveParking}>
        <Text style={styles.primaryButtonText}>Save parking spot</Text>
      </Pressable>
    </ScrollView>
  );
}

function FindParkingScreen({ navigation }) {
  const { parkingSpots } = useAppData();
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      parkingSpots.filter((parking) =>
        `${parking.name} ${parking.location}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search, parkingSpots]
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>EXPLORE</Text>
      <Text style={styles.pageTitle}>Find Parking</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search by name or location"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      {filtered.map((parking) => (
        <ParkingCard
          key={parking.id}
          parking={parking}
          onPress={() => navigation.navigate('ParkingDetails', { parking })}
        />
      ))}
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
        <Text style={styles.available}>{parking.available} slots available</Text>
      </View>

      <Text style={styles.price}>Rs. {parking.price}</Text>
    </Pressable>
  );
}

function ParkingDetailsScreen({ route, navigation }) {
  const parking = route.params?.parking;
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

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Rs. {parking.price} per hour</Text>
        <Text style={styles.infoText}>{parking.available} slots available</Text>
        <Text style={styles.infoText}>✓ Security available</Text>
        <Text style={styles.infoText}>✓ CCTV monitoring</Text>
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
  const parking = route.params?.parking;
  const { addBooking } = useAppData();
  const [vehicle, setVehicle] = useState('');
  const [duration, setDuration] = useState('');
  const [saved, setSaved] = useState(false);

  function confirmBooking() {
    if (!vehicle || !duration) return;

    addBooking({ ...parking, vehicle, duration });
    setSaved(true);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>RESERVATION</Text>
      <Text style={styles.pageTitle}>Book Parking</Text>

      <View style={styles.infoCard}>
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
      <Text style={styles.pageTitle}>My Bookings</Text>

      {bookings.length === 0 ? (
        <Text style={styles.description}>No bookings yet.</Text>
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
      <Text style={styles.pageTitle}>Favourites</Text>

      {favourites.length === 0 ? (
        <Text style={styles.description}>No favourite locations yet.</Text>
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

function AboutScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>About ParkSmart</Text>
        <Text style={styles.description}>
          ParkSmart is an offline parking management app. Drivers can find and
          book parking while owners can add and manage their parking spaces.
        </Text>
      </View>
    </View>
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

export default function App() {
  const [role, setRoleState] = useState('driver');
  const [parkingSpots, setParkingSpots] = useState(parkingDefaults);
  const [bookings, setBookings] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function loadData() {
      const savedRole = await AsyncStorage.getItem('parkSmartRole');
      const savedParking = await AsyncStorage.getItem('parkSmartParking');
      const savedBookings = await AsyncStorage.getItem('parkSmartBookings');
      const savedFavourites = await AsyncStorage.getItem('parkSmartFavourites');

      if (savedRole) setRoleState(savedRole);
      if (savedParking) setParkingSpots(JSON.parse(savedParking));
      if (savedBookings) setBookings(JSON.parse(savedBookings));
      if (savedFavourites) setFavourites(JSON.parse(savedFavourites));
    }

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('parkSmartRole', role);
    AsyncStorage.setItem('parkSmartParking', JSON.stringify(parkingSpots));
    AsyncStorage.setItem('parkSmartBookings', JSON.stringify(bookings));
    AsyncStorage.setItem('parkSmartFavourites', JSON.stringify(favourites));
  }, [role, parkingSpots, bookings, favourites]);

  function setRole(newRole) {
    setRoleState(newRole);
  }

  function addParking(parking) {
    setParkingSpots((current) => [
      ...current,
      { ...parking, id: Date.now() },
    ]);
  }

  function addBooking(parking) {
    setBookings((current) => [
      {
        id: Date.now(),
        parkingName: parking.name,
        location: parking.location,
        vehicle: parking.vehicle,
        duration: parking.duration,
        bookedAt: new Date().toLocaleString(),
      },
      ...current,
    ]);
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
    <AppContext.Provider
      value={{
        role,
        setRole,
        parkingSpots,
        addParking,
        bookings,
        addBooking,
        favourites,
        toggleFavourite,
      }}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#102A56' },
              headerTintColor: '#FFFFFF',
              contentStyle: { backgroundColor: '#F5F7FB' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ParkSmart' }} />
            <Stack.Screen name="Role" component={RoleScreen} options={{ title: 'Switch Role' }} />
            <Stack.Screen name="AddParking" component={AddParkingScreen} options={{ title: 'Add Parking' }} />
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
  ownerHero: {
    backgroundColor: '#7C3AED',
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
  },
  lightLabel: {
    color: '#C7D8F4',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
    marginTop: 8,
  },
  heroText: {
    color: '#D9E7FA',
    fontSize: 16,
    lineHeight: 23,
    marginVertical: 20,
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

  switchButton: {
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  switchText: { color: '#2563EB', fontWeight: '800' },

  statsRow: { flexDirection: 'row', marginBottom: 24 },
  stat: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginRight: 8,
  },
  statValue: { color: '#102A56', fontSize: 21, fontWeight: '800' },
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
  },
  actionIcon: { color: '#2563EB', fontSize: 25, marginBottom: 10 },
  actionTitle: { color: '#102A56', fontWeight: '800' },

  label: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  pageTitle: {
    color: '#102A56',
    fontSize: 29,
    fontWeight: '800',
    marginBottom: 12,
  },
  description: {
    color: '#718096',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
  },

  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
  },
  roleIcon: { fontSize: 34, marginBottom: 12 },
  roleTitle: { color: '#102A56', fontSize: 18, fontWeight: '800' },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    color: '#102A56',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },
  formLabel: {
    color: '#102A56',
    fontWeight: '800',
    marginBottom: 8,
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: '#E8F0FF',
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontWeight: '800',
  },

  parkingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  parkingName: { color: '#102A56', fontWeight: '800' },
  muted: { color: '#718096', fontSize: 12, marginTop: 4 },
  available: { color: '#059669', fontSize: 11, marginTop: 8 },
  price: { color: '#102A56', fontWeight: '800' },

  banner: {
    height: 145,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  bannerIcon: { color: '#FFFFFF', fontSize: 52, fontWeight: '900' },
  bannerText: { color: '#FFFFFF', fontWeight: '800' },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  infoTitle: { color: '#102A56', fontSize: 17, fontWeight: '800' },
  infoText: { color: '#526176', marginTop: 9 },
});