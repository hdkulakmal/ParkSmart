import React from 'react';
import { Pressable, Text } from 'react-native';

export default function PrimaryButton({ title, onPress, styles }) {
  return <Pressable style={styles.primaryButton} onPress={onPress}><Text style={styles.primaryButtonText}>{title}</Text></Pressable>;
}
