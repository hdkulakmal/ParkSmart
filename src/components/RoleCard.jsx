import React from 'react';
import { Pressable, Text } from 'react-native';

export default function RoleCard({ icon, title, description, onPress, styles }) {
  return <Pressable style={styles.roleCard} onPress={onPress}><Text style={styles.roleIcon}>{icon}</Text><Text style={styles.roleTitle}>{title}</Text><Text style={styles.muted}>{description}</Text></Pressable>;
}
