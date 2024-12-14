import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminTabs from '../components/AdminTabs';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

export default function AdminDashboardScreen() {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Admin Dashboard</Text>
      <AdminTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

