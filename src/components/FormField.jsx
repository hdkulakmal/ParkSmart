import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function FormField({ label, value, onChangeText, placeholder, keyboardType = 'default', styles }) {
  return <View><Text style={styles.formLabel}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} keyboardType={keyboardType} placeholderTextColor="#94A3B8" style={styles.input} /></View>;
}
