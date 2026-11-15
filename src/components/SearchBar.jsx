import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder = 'Search parking locations', styles }) {
  return <View style={styles.searchBar}><Text style={styles.searchIcon}>⌕</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#94A3B8" style={styles.searchInput} /></View>;
}
