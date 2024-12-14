import React, { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme, ThemeColors } from '../styles/theme';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { calculateDistance } from '../utils/distanceCalculator';
import { useStations } from '../contexts/StationContext';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Station } from '../type/Station';

// Define the RootStackParamList type
type RootStackParamList = {
  StationDetail: { stationId: string };
  // Add other screen names and their params here
};

// Define the navigation prop type
type StationListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StationDetail'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
  },
});

export default function StationListScreen() {
  const navigation = useNavigation<StationListScreenNavigationProp>();
  const { theme } = useTheme();
  const colors: ThemeColors = theme === 'light' ? lightTheme : darkTheme;
  const { stations } = useStations();
  const [sortProduct, setSortProduct] = useState<keyof Station['prices']>('petrol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const userLocation = { latitude: 51.5074, longitude: 0.1278 }; // Example user location

  const sortedStations = useMemo(() => {
    return [...stations].sort((a, b) => {
      const priceA = a.prices[sortProduct];
      const priceB = b.prices[sortProduct];
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }, [stations, sortProduct, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderItem = ({ item }: { item: Station }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('StationDetail', { stationId: item.id })}
    >
      <Text style={[styles.title, { color: colors.text, fontWeight: 'bold' }]}>{item.name}</Text>
      <Text style={{ color: colors.text }}>Petrol: ${item.prices.petrol.toFixed(2)}</Text>
      <Text style={{ color: colors.text }}>Diesel: ${item.prices.diesel.toFixed(2)}</Text>
      <Text style={{ color: colors.text }}>Kerosene: ${item.prices.kerosene.toFixed(2)}</Text>
      <Text style={{ color: colors.text }}>Gas: ${item.prices.gas.toFixed(2)}</Text>
      <Text style={{ color: colors.text }}>
        Distance: {calculateDistance(userLocation, { latitude: item.latitude, longitude: item.longitude })} km
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.sortContainer}>
        <Picker
          selectedValue={sortProduct}
          onValueChange={(itemValue: keyof Station['prices']) => setSortProduct(itemValue)}
          style={[styles.picker, { color: colors.text }]}
        >
          <Picker.Item label="Petrol" value="petrol" />
          <Picker.Item label="Diesel" value="diesel" />
          <Picker.Item label="Kerosene" value="kerosene" />
          <Picker.Item label="Gas" value="gas" />
        </Picker>
        <TouchableOpacity onPress={toggleSortOrder}>
          <Ionicons name={sortOrder === 'asc' ? 'arrow-down' : 'arrow-up'} color={colors.text} />
        </TouchableOpacity>
      </View>
      <FlatList data={sortedStations} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}
