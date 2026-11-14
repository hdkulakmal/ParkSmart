# ParkSmart

ParkSmart is an offline React Native parking management application. It allows drivers to find and book parking spaces while allowing parking owners to add and manage their own parking locations.

The application works without public APIs, online databases, or an internet connection.

## Main Features

- Driver and Parking Owner role switching
- Search parking locations by name or city
- View parking location details
- Add parking locations as an owner
- Save favourite parking locations
- Book parking spaces
- View saved bookings
- Store data locally using AsyncStorage
- Works offline
- Clean and responsive mobile-friendly interface

## Application Screens

### Driver Mode

- Home
- Find Parking
- Parking Details
- Book Parking
- My Bookings
- Favourites
- About ParkSmart

### Parking Owner Mode

- Owner Dashboard
- Add Parking Spot
- View Listed Parking Spots
- Switch back to Driver Mode

## Technology Stack

- React Native
- Expo
- JavaScript
- React Navigation
- AsyncStorage
- React Native Web

## Local Data Storage

ParkSmart stores application data locally on the device using AsyncStorage.

The following data is stored locally:

- User role
- Parking locations
- Bookings
- Favourite parking locations

No online database or public API is used.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/hdkulakmal/ParkSmart.git
cd ParkSmart
