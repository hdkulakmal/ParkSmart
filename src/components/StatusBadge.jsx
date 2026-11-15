import React from 'react';
import { Text } from 'react-native';

export default function StatusBadge({ available, styles }) {
  const isAvailable = Number(available) > 0;
  return <Text style={[styles.statusBadge, isAvailable ? styles.statusAvailable : styles.statusFull]}>{isAvailable ? `${available} available` : 'Full'}</Text>;
}
