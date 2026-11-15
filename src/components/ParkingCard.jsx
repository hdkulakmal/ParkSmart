import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ParkingCard({ parking, onPress, styles }) {
  return <Pressable style={styles.parkingCard} onPress={onPress}>
    <View style={[styles.parkingIcon, { backgroundColor: parking.color }]}><Text style={styles.parkingIconText}>P</Text></View>
    <View style={styles.parkingInfo}><Text style={styles.parkingName}>{parking.name}</Text><Text style={styles.muted}>{parking.location}</Text><Text style={styles.available}>{parking.available} slots available</Text></View>
    <Text style={styles.price}>Rs. {parking.price}</Text>
  </Pressable>;
}
