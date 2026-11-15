import React from 'react';
import { Text, View } from 'react-native';

export default function Stat({ value, label, styles }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}
