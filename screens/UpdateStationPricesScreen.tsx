import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useStations } from '../contexts/StationContext';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme, ThemeColors } from '../styles/theme';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

type RouteParams = {
  UpdatePrices: {
    stationId: string;
  };
};

export default function UpdateStationPricesScreen() {
  const { theme } = useTheme();
  const colors: ThemeColors = theme === 'light' ? lightTheme : darkTheme;
  const { stations, updateStationPrices } = useStations();
  const route = useRoute<RouteProp<RouteParams, 'UpdatePrices'>>();
  const navigation = useNavigation();

  const station = stations.find(s => s.id === route.params.stationId);

  const [petrolPrice, setPetrolPrice] = useState(station?.prices.petrol.toString() || '');
  const [dieselPrice, setDieselPrice] = useState(station?.prices.diesel.toString() || '');
  const [kerosenePrice, setKerosenePrice] = useState(station?.prices.kerosene.toString() || '');
  const [gasPrice, setGasPrice] = useState(station?.prices.gas.toString() || '');
  const [password, setPassword] = useState('');

  const handleUpdatePrices = () => {
    if (password !== 'admin123') { // Replace with a secure password verification method
      Alert.alert('Error', 'Incorrect password');
      return;
    }

    if (!petrolPrice || !dieselPrice || !kerosenePrice || !gasPrice) {
      Alert.alert('Error', 'Please fill in all price fields');
      return;
    }

    const newPrices = {
      petrol: parseFloat(petrolPrice),
      diesel: parseFloat(dieselPrice),
      kerosene: parseFloat(kerosenePrice),
      gas: parseFloat(gasPrice),
    };

    updateStationPrices(station!.id, newPrices);
    Alert.alert('Success', 'Prices updated successfully');
    navigation.goBack();
  };

  if (!station) {
    return <Text style={[styles.errorText, { color: colors.text }]}>Station not found</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Input
        placeholder="Petrol Price"
        value={petrolPrice}
        onChangeText={setPetrolPrice}
        keyboardType="numeric"
      />
      <Input
        placeholder="Diesel Price"
        value={dieselPrice}
        onChangeText={setDieselPrice}
        keyboardType="numeric"
      />
      <Input
        placeholder="Kerosene Price"
        value={kerosenePrice}
        onChangeText={setKerosenePrice}
        keyboardType="numeric"
      />
      <Input
        placeholder="Gas Price"
        value={gasPrice}
        onChangeText={setGasPrice}
        keyboardType="numeric"
      />
      <Input
        placeholder="Admin Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleUpdatePrices} style={styles.updateButton}>
        Update Prices
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  updateButton: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

