import React, { createContext, useState, useContext } from 'react';
import { Station } from '../type/Station';

interface StationContextType {
  stations: Station[];
  setStations: React.Dispatch<React.SetStateAction<Station[]>>;
  addStation: (station: Station) => void;
  updateStation: (id: string, updatedStation: Partial<Station>) => void;
  updateStationPrices: (id: string, newPrices: Station['prices']) => void;
  deleteStation: (id: string) => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>([]);

  const addStation = (station: Station) => {
    setStations([...stations, station]);
  };

  const updateStation = (id: string, updatedStation: Partial<Station>) => {
    setStations(stations.map(station => 
      station.id === id ? { ...station, ...updatedStation } : station
    ));
  };

  const updateStationPrices = (id: string, newPrices: Station['prices']) => {
    setStations(stations.map(station => 
      station.id === id ? { ...station, prices: newPrices } : station
    ));
  };

  const deleteStation = (id: string) => {
    setStations(stations.filter(station => station.id !== id));
  };

  return (
    <StationContext.Provider value={{ stations, setStations, addStation, updateStation, updateStationPrices, deleteStation }}>
      {children}
    </StationContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error('useStations must be used within a StationProvider');
  }
  return context;
};

