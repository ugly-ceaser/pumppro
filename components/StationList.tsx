'use client'

import { useState, useEffect } from 'react'
import { Station } from '../type/Station'
import { calculateDistance } from '../utils/distanceCalculator'

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

export default function StationList() {
  const [stations, setStations] = useState<Station[]>([])
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  useEffect(() => {
    // Get user's location
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting user location:', error)
        }
      )
    }

    // Fetch stations from API
    const fetchStations = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/stations')
        const data = await response.json()
        setStations(data)
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }

    fetchStations()
  }, [])

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Nearby Stations</h2>
      <ul className="space-y-4">
        {stations.map((station) => (
          <li key={station.id} className="border-b pb-2">
            <h3 className="font-medium">{station.name}</h3>
            {userLocation && (
              <p className="text-sm text-gray-600">
                Distance: {calculateDistance(userLocation, { latitude: station.latitude, longitude: station.longitude })} km
              </p>
            )}
            <div className="mt-2">
              <p className="text-sm">Petrol: ${station.prices.petrol.toFixed(2)}/L</p>
              <p className="text-sm">Diesel: ${station.prices.diesel.toFixed(2)}/L</p>
              <p className="text-sm">Kerosene: ${station.prices.kerosene.toFixed(2)}/L</p>
              <p className="text-sm">Gas: ${station.prices.gas.toFixed(2)}/kg</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

