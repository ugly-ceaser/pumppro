import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useStations } from '../contexts/StationContext';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import * as Location from 'expo-location';

export default function AddStationScreen() {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;
  const { addStation } = useStations();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [petrolPrice, setPetrolPrice] = useState('');
  const [dieselPrice, setDieselPrice] = useState('');
  const [kerosenePrice, setKerosenePrice] = useState('');
  const [gasPrice, setGasPrice] = useState('');

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude.toString());
    setLongitude(location.coords.longitude.toString());
  };

  const handleAddStation = () => {
    if (!name || !latitude || !longitude || !petrolPrice || !dieselPrice || !kerosenePrice || !gasPrice) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newStation = {
      id: Date.now().toString(),
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      prices: {
        petrol: parseFloat(petrolPrice),
        diesel: parseFloat(dieselPrice),
        kerosene: parseFloat(kerosenePrice),
        gas: parseFloat(gasPrice),
      },
    };

    addStation(newStation);
    Alert.alert('Success', 'Station added successfully');
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setLatitude('');
    setLongitude('');
    setPetrolPrice('');
    setDieselPrice('');
    setKerosenePrice('');
    setGasPrice('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Input
        placeholder="Station Name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.locationContainer}>
        <Input
          style={styles.locationInput}
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />
        <Input
          style={styles.locationInput}
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />
        <Button onPress={getCurrentLocation} variant="outline">
          Get Location
        </Button>
      </View>
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
      <Button onPress={handleAddStation}>Add Station</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationInput: {
    flex: 1,
    marginRight: 8,
  },
});

