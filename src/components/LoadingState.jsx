import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingState({ message = 'Loading...', styles }) {
  return <View style={styles.loadingState}><ActivityIndicator size="large" color="#2563EB" /><Text style={styles.loadingText}>{message}</Text></View>;
}
