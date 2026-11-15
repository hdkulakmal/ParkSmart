import React from 'react';
import { Text, View } from 'react-native';

export default function EmptyState({ title, message, styles }) {
  return <View style={styles.emptyState}><Text style={styles.emptyIcon}>♡</Text><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.description}>{message}</Text></View>;
}
