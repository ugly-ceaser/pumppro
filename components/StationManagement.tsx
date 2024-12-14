'use client'

import { useState, useEffect } from 'react'
import { Station } from '../type/Station'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

// New type definitions
type PriceField = keyof Station['prices']
type StationInputProps = {
  label: string
  value: string | number
  type?: 'text' | 'number'
  placeholder?: string
  onChange: (value: string) => void
}

// Reusable input component
const StationInput = ({ label, value, type = 'text', placeholder, onChange }: StationInputProps) => (
  <Input
    placeholder={placeholder || label}
    defaultValue={value?.toString() || ''}
    onChange={(e: any) => onChange(e.target.value)}
    aria-label={label}
  />
)

// Price fields configuration
const PRICE_FIELDS: { key: PriceField; label: string; unit: string }[] = [
  { key: 'petrol', label: 'Petrol Price', unit: '/L' },
  { key: 'diesel', label: 'Diesel Price', unit: '/L' },
  { key: 'kerosene', label: 'Kerosene Price', unit: '/L' },
  { key: 'gas', label: 'Gas Price', unit: '/kg' },
]

// Add StyleSheet at the top
const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  errorText: {
    color: '#ef4444',
  },
  formContainer: {
    marginBottom: 32,
    gap: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  gridItem: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  stationCard: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  stationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stationTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  stationLocation: {
    fontSize: 14,
    color: '#666',
  },
  priceGrid: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceText: {
    fontSize: 14,
    width: '50%',
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  loadingText: {
    textAlign: 'center',
  },
});

// Extracted components for better readability and reusability
const ErrorMessage = ({ error }: { error: string | null }) => (
  error ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  ) : null
);

const StationForm = ({ newStation, updateStationField, updatePriceField, handleAddStation, isLoading }: any) => (
  <View style={styles.formContainer}>
    <StationInput
      label="Station Name"
      value={newStation.name || ''}
      onChange={(value) => updateStationField('name', value)}
    />
    <View style={styles.gridContainer}>
      <View style={styles.gridItem}>
        <StationInput
          label="Latitude"
          type="number"
          value={newStation.latitude || ''}
          onChange={(value) => updateStationField('latitude', value)}
        />
      </View>
      <View style={styles.gridItem}>
        <StationInput
          label="Longitude"
          type="number"
          value={newStation.longitude || ''}
          onChange={(value) => updateStationField('longitude', value)}
        />
      </View>
    </View>
    <View style={styles.priceContainer}>
      {PRICE_FIELDS.map(({ key, label }) => (
        <StationInput
          key={key}
          label={label}
          type="number"
          value={newStation.prices?.[key] || ''}
          onChange={(value) => updatePriceField(key, value)}
        />
      ))}
    </View>
    <Button 
      disabled={isLoading} 
      variant="default" 
      onPress={handleAddStation}
    >
      {isLoading ? 'Adding...' : 'Add Station'}
    </Button>
  </View>
);

const StationList = ({ stations }: { stations: Station[] }) => (
  <View>
    {stations.map((station) => (
      <View key={station.id} style={styles.stationCard}>
        <View style={styles.stationHeader}>
          <View>
            <Text style={styles.stationTitle}>{station.name}</Text>
            <Text style={styles.stationLocation}>
              Location: {station.latitude}, {station.longitude}
            </Text>
          </View>
          <Button variant="outline">
            <Text>Edit</Text>
          </Button>
        </View>
        <View style={styles.priceGrid}>
          {PRICE_FIELDS.map(({ key, label, unit }) => (
            <Text key={key} style={styles.priceText}>
              {label.split(' ')[0]}: ${station.prices[key]}{unit}
            </Text>
          ))}
        </View>
      </View>
    ))}
  </View>
);

export default function StationManagement() {
  const [stations, setStations] = useState<Station[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newStation, setNewStation] = useState<Partial<Station>>({
    name: '',
    latitude: 0,
    longitude: 0,
    prices: { petrol: 0, diesel: 0, kerosene: 0, gas: 0 },
  })

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/stations')
        if (!response.ok) throw new Error('Failed to fetch stations')
        const data = await response.json()
        setStations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStations()
  }, [])

  const handleAddStation = async () => {
    if (!newStation.name || !newStation.latitude || !newStation.longitude) {
      setError('Please fill in all required fields')
      return
    }
    
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStation),
      })
      if (!response.ok) throw new Error('Failed to add station')
      const addedStation = await response.json()
      setStations([...stations, addedStation])
      setNewStation({
        name: '',
        latitude: 0,
        longitude: 0,
        prices: { petrol: 0, diesel: 0, kerosene: 0, gas: 0 },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add station')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStationField = (field: keyof Omit<Station, 'id' | 'prices'>, value: string) => {
    setNewStation({
      ...newStation,
      [field]: field === 'name' ? value : parseFloat(value) || 0,
    })
  }

  const updatePriceField = (field: PriceField, value: string) => {
    setNewStation({
      ...newStation,
      prices: {
        ...newStation.prices!,
        [field]: parseFloat(value) || 0,
      },
    })
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Station Management</Text>
      <ErrorMessage error={error} />
      <StationForm
        newStation={newStation}
        updateStationField={updateStationField}
        updatePriceField={updatePriceField}
        handleAddStation={handleAddStation}
        isLoading={isLoading}
      />
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <StationList stations={stations} />
      )}
    </ScrollView>
  )
}

