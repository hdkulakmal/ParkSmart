import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const parkingData = [
  {
    id: 1,
    name: 'City Center Parking',
    location: 'Colombo 03',
    price: 150,
    available: 24,
    total: 60,
    distance: '0.8 km',
    color: '#2563EB',
  },
  {
    id: 2,
    name: 'Liberty Plaza Parking',
    location: 'Colombo 03',
    price: 200,
    available: 12,
    total: 40,
    distance: '1.2 km',
    color: '#7C3AED',
  },
  {
    id: 3,
    name: 'Galle Face Car Park',
    location: 'Colombo 01',
    price: 100,
    available: 31,
    total: 80,
    distance: '2.1 km',
    color: '#059669',
  },
];

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.homeContent}>
      <StatusBar barStyle="light-content" />

      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.welcome}>WELCOME BACK</Text>
            <Text style={styles.heroTitle}>ParkSmart</Text>
          </View>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>P</Text>
          </View>
        </View>

        <Text style={styles.heroMessage}>
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
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Available spots</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Nearby locations</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick actions</Text>

      <View style={styles.actionGrid}>
        <ActionCard
          icon="⌕"
          title="Find Parking"
          subtitle="Search locations"
          onPress={() => navigation.navigate('FindParking')}
        />
        <ActionCard
          icon="▣"
          title="My Bookings"
          subtitle="View reservations"
          onPress={() => navigation.navigate('MyBookings')}
        />
        <ActionCard
          icon="♡"
          title="Favourites"
          subtitle="Saved locations"
          onPress={() => navigation.navigate('Favourites')}
        />
        <ActionCard
          icon="ⓘ"
          title="About"
          subtitle="How ParkSmart works"
          onPress={() => navigation.navigate('About')}
        />
      </View>

      <Text style={styles.sectionTitle}>Popular nearby</Text>

      {parkingData.slice(0, 2).map((parking) => (
        <ParkingCard
          key={parking.id}
          parking={parking}
          onPress={() =>
            navigation.navigate('ParkingDetails', { parking })
          }
        />
      ))}
    </ScrollView>
  );
}

function ActionCard({ icon, title, subtitle, onPress }) {
  return (
    <Pressable style={styles.actionCard} onPress={onPress}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

function FindParkingScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredParking = useMemo(() => {
    return parkingData.filter((parking) =>
      `${parking.name} ${parking.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.pageLabel}>EXPLORE</Text>
      <Text style={styles.pageTitle}>Find Parking</Text>
      <Text style={styles.pageDescription}>
        Search available parking locations near you.
      </Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by location or name"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.resultHeader}>
        <Text style={styles.sectionTitle}>Available locations</Text>
        <Text style={styles.resultCount}>{filteredParking.length} found</Text>
      </View>

      {filteredParking.map((parking) => (
        <ParkingCard
          key={parking.id}
          parking={parking}
          onPress={() =>
            navigation.navigate('ParkingDetails', { parking })
          }
        />
      ))}

      {filteredParking.length === 0 && (
        <View style={styles.emptyBox}>
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
        <Text style={styles.parkingLocation}>{parking.location}</Text>

        <View style={styles.parkingMeta}>
          <Text style={styles.availableText}>
            {parking.available} spots available
          </Text>
          <Text style={styles.distanceText}>{parking.distance}</Text>
        </View>
      </View>

      <View style={styles.priceBox}>
        <Text style={styles.price}>Rs. {parking.price}</Text>
        <Text style={styles.perHour}>per hour</Text>
      </View>
    </Pressable>
  );
}

function ParkingDetailsScreen({ route, navigation }) {
  const parking = route.params?.parking || parkingData[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.detailBanner, { backgroundColor: parking.color }]}>
        <Text style={styles.detailBannerIcon}>P</Text>
        <Text style={styles.detailBannerText}>PARKING LOCATION</Text>
      </View>

      <Text style={styles.pageTitle}>{parking.name}</Text>
      <Text style={styles.pageDescription}>{parking.location}</Text>

      <View style={styles.detailStats}>
        <DetailStat value={`Rs. ${parking.price}`} label="Per hour" />
        <DetailStat value={parking.available} label="Available" />
        <DetailStat value={parking.distance} label="Distance" />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Facilities</Text>
        <Text style={styles.facility}>✓ 24-hour security</Text>
        <Text style={styles.facility}>✓ CCTV monitoring</Text>
        <Text style={styles.facility}>✓ Easy entrance and exit</Text>
        <Text style={styles.facility}>✓ Suitable for cars and vans</Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate('BookParking', { parking })}
      >
        <Text style={styles.primaryButtonText}>Reserve this location</Text>
        <Text style={styles.primaryButtonArrow}>›</Text>
      </Pressable>
    </ScrollView>
  );
}

function DetailStat({ value, label }) {
  return (
    <View style={styles.detailStat}>
      <Text style={styles.detailValue}>{value}</Text>
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
  );
}

function BookParkingScreen({ route }) {
  const parking = route.params?.parking || parkingData[0];

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageLabel}>RESERVATION</Text>
        <Text style={styles.pageTitle}>Book Parking</Text>

        <View style={styles.bookingSummary}>
          <Text style={styles.bookingName}>{parking.name}</Text>
          <Text style={styles.bookingLocation}>{parking.location}</Text>
          <Text style={styles.bookingPrice}>Rs. {parking.price} / hour</Text>
        </View>

        <Text style={styles.formLabel}>Vehicle number</Text>
        <TextInput
          placeholder="Example: ABC-1234"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        <Text style={styles.formLabel}>Duration</Text>
        <TextInput
          placeholder="Example: 2 hours"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Confirm booking</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MyBookingsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageLabel}>YOUR ACTIVITY</Text>
        <Text style={styles.pageTitle}>My Bookings</Text>

        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>▣</Text>
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.emptyText}>
            Your confirmed parking bookings will appear here.
          </Text>
        </View>
      </View>
    </View>
  );
}

function FavouritesScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageLabel}>SAVED PLACES</Text>
        <Text style={styles.pageTitle}>Favourites</Text>

        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptyText}>
            Save your favourite parking locations for quick access.
          </Text>
        </View>
      </View>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.pageLabel}>ABOUT THE APP</Text>
        <Text style={styles.pageTitle}>ParkSmart</Text>
        <Text style={styles.pageDescription}>
          ParkSmart helps drivers find and manage parking locations easily.
          This student project works with locally stored data and does not
          require an internet connection.
        </Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
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
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  homeContent: {
    padding: 20,
    paddingBottom: 40,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#102A56',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    color: '#9DBAE5',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginTop: 6,
  },
  profileCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  heroMessage: {
    color: '#D9E7FA',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 28,
    maxWidth: 230,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroButtonText: {
    color: '#102A56',
    fontWeight: '800',
  },
  arrow: {
    color: '#2563EB',
    fontSize: 25,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },
  statNumber: {
    color: '#102A56',
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: '#718096',
    fontSize: 12,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#102A56',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 26,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },
  actionIcon: {
    color: '#2563EB',
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 12,
  },
  actionTitle: {
    color: '#102A56',
    fontSize: 14,
    fontWeight: '800',
  },
  actionSubtitle: {
    color: '#718096',
    fontSize: 12,
    marginTop: 5,
  },
  parkingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
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
  parkingIconText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
  },
  parkingInfo: {
    flex: 1,
  },
  parkingName: {
    color: '#102A56',
    fontSize: 15,
    fontWeight: '800',
  },
  parkingLocation: {
    color: '#718096',
    fontSize: 12,
    marginTop: 4,
  },
  parkingMeta: {
    flexDirection: 'row',
    marginTop: 9,
    gap: 10,
  },
  availableText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  distanceText: {
    color: '#718096',
    fontSize: 11,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#102A56',
    fontSize: 13,
    fontWeight: '800',
  },
  perHour: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 3,
  },
  pageLabel: {
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
  pageDescription: {
    color: '#718096',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 22,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EAF2',
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 24,
    color: '#2563EB',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#102A56',
    fontSize: 14,
    paddingVertical: 15,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    color: '#718096',
    fontSize: 12,
    marginBottom: 12,
  },
  detailBanner: {
    height: 150,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  detailBannerIcon: {
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '900',
  },
  detailBannerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  detailStats: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },
  detailStat: {
    flex: 1,
    alignItems: 'center',
  },
  detailValue: {
    color: '#102A56',
    fontWeight: '800',
    fontSize: 14,
  },
  detailLabel: {
    color: '#718096',
    fontSize: 11,
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  infoTitle: {
    color: '#102A56',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
  },
  facility: {
    color: '#526176',
    fontSize: 14,
    marginTop: 9,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  primaryButtonArrow: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  bookingSummary: {
    backgroundColor: '#E8F0FF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  bookingName: {
    color: '#102A56',
    fontSize: 17,
    fontWeight: '800',
  },
  bookingLocation: {
    color: '#526176',
    marginTop: 5,
  },
  bookingPrice: {
    color: '#2563EB',
    fontWeight: '800',
    marginTop: 12,
  },
  formLabel: {
    color: '#102A56',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF2',
    borderRadius: 12,
    padding: 15,
    color: '#102A56',
    marginBottom: 18,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginTop: 14,
  },
  emptyIcon: {
    color: '#2563EB',
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    color: '#102A56',
    fontSize: 17,
    fontWeight: '800',
  },
  emptyText: {
    color: '#718096',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 7,
  },
});