import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { setUser } = useUser();
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const handleLogin = () => {
    // In a real app, you would validate credentials against a backend
    if (email === 'admin@example.com' && password === 'admin') {
      setUser({ 
        id: '1', 
        email, 
        password,
        passcode: '', 
        role: 'admin',
        isAdmin: true 
      });
      navigation.navigate('AdminHome' as never);
    } else if (email && password) {
      setUser({ 
        id: '2', 
        email,
        password,
        passcode: '',
        role: 'user',
        isAdmin: false 
      });
      navigation.navigate('UserHome' as never);
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleLogin}>Login</Button>
      <Button 
        variant="outline" 
        onPress={() => navigation.navigate('Register' as never)}
        style={styles.registerButton}
      >
        Don't have an account? Register here
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  registerButton: {
    marginTop: 16,
  },
});

