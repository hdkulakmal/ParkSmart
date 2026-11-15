import React from 'react';
import { Text, View } from 'react-native';

export default function ScreenHeader({ label, title, description, styles }) {
  return <View><Text style={styles.label}>{label}</Text><Text style={styles.pageTitle}>{title}</Text>{description ? <Text style={styles.description}>{description}</Text> : null}</View>;
}
