import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

export const LogoutButton: React.FC = () => {
  const navigation = useNavigation<any>();
  const { logout } = useUser();
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={[styles.button, { backgroundColor: colors.primary }]}
    >
      <Text style={[styles.text, { color: colors.background }]}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

