import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '../components/ui/button';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme, ThemeColors } from '../styles/theme';

interface FuelConsumption {
  liters: number;
  cost: number;
}

export default function FuelConsumptionScreen() {
  const { theme } = useTheme();
  const colors: ThemeColors = theme === 'light' ? lightTheme : darkTheme;
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [timePeriod, setTimePeriod] = useState('week');
  const [result, setResult] = useState<FuelConsumption | null>(null);

  const calculateConsumption = () => {
    const distanceNum = parseFloat(distance);
    const fuelEfficiencyNum = parseFloat(fuelEfficiency);
    const fuelPriceNum = parseFloat(fuelPrice);

    if (isNaN(distanceNum) || isNaN(fuelEfficiencyNum) || isNaN(fuelPriceNum)) {
      Alert.alert('Error', 'Please enter valid numbers for all fields');
      return;
    }

    let multiplier = 1;
    switch (timePeriod) {
      case 'day':
        multiplier = 1;
        break;
      case 'week':
        multiplier = 7;
        break;
      case 'month':
        multiplier = 30;
        break;
      case 'year':
        multiplier = 365;
        break;
    }

    const liters = (distanceNum / fuelEfficiencyNum) * multiplier;
    const cost = liters * fuelPriceNum;

    setResult({ liters, cost });
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.text,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: '600',
      color: colors.text,
    },
    input: {
      height: 40,
      borderColor: colors.border,
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: colors.card,
      color: colors.text,
    },
    picker: {
      height: 40,
      marginBottom: 15,
      backgroundColor: colors.card,
      color: colors.text,
      borderRadius: 5,
    },
    button: {
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: colors.primary,
    },
    resultContainer: {
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 5,
      marginTop: 20,
    },
    resultText: {
      fontSize: 18,
      marginBottom: 10,
      color: colors.text,
    },
  }), [colors]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fuel Consumption Calculator</Text>
      
      <Text style={styles.label}>Daily Distance (km)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
        placeholder="e.g., 50"
      />

      <Text style={styles.label}>Fuel Efficiency (km/L)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fuelEfficiency}
        onChangeText={setFuelEfficiency}
        placeholder="e.g., 12"
      />

      <Text style={styles.label}>Fuel Price (per liter)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fuelPrice}
        onChangeText={setFuelPrice}
        placeholder="e.g., 1.5"
      />

      <Text style={styles.label}>Time Period</Text>
      <Picker
        selectedValue={timePeriod}
        onValueChange={(itemValue) => setTimePeriod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Daily" value="day" />
        <Picker.Item label="Weekly" value="week" />
        <Picker.Item label="Monthly" value="month" />
        <Picker.Item label="Yearly" value="year" />
      </Picker>

      <Button onPress={calculateConsumption} style={styles.button}>
        Calculate
      </Button>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Fuel Consumption: {result.liters.toFixed(2)} liters
          </Text>
          <Text style={styles.resultText}>
            Fuel Cost: ${result.cost.toFixed(2)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

