import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useStations } from '../contexts/StationContext';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme, ThemeColors } from '../styles/theme';
import { Button } from '../components/ui/button';
import { useUser } from '../contexts/UserContext';

type RouteParams = {
  StationDetail: {
    stationId: string;
  };
};

type RootStackParamList = {
  UpdatePrices: { stationId: string };
};

export default function StationDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, 'StationDetail'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { stations } = useStations();
  const { theme } = useTheme();
  const colors: ThemeColors = theme === 'light' ? lightTheme : darkTheme;
  const { user } = useUser();

  const station = stations.find(s => s.id === route.params.stationId);

  if (!station) {
    return <Text style={[styles.errorText, { color: colors.text }]}>Station not found</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{station.name}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Petrol: ${station.prices.petrol.toFixed(2)}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Diesel: ${station.prices.diesel.toFixed(2)}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Kerosene: ${station.prices.kerosene.toFixed(2)}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Gas: ${station.prices.gas.toFixed(2)}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Latitude: {station.latitude}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Longitude: {station.longitude}</Text>
      
      {user?.isAdmin && (
        <Button 
          onPress={() => navigation.navigate('UpdatePrices', { stationId: station.id })}
          style={styles.updateButton}
        >
          Update Prices
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  updateButton: {
    marginTop: 20,
  },
});

