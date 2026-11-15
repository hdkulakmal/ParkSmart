import React from 'react';
import { Pressable, Text } from 'react-native';

export default function Action({ title, icon, onPress, styles }) {
  return <Pressable style={styles.action} onPress={onPress}><Text style={styles.actionIcon}>{icon}</Text><Text style={styles.actionTitle}>{title}</Text></Pressable>;
}
