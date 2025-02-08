import React, { createContext, useState, useContext, ReactNode } from 'react';
import ConnectZone from './connectZoneType';

type SelectedZoneContextType = {
  selectedZone: ConnectZone | null;
  setSelectedZone: (zone: ConnectZone | null) => void;
};

export const SelectedZoneContext = createContext<SelectedZoneContextType | undefined>(undefined);

export const SelectedZoneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedZone, setSelectedZone] = useState<ConnectZone | null>(null);

  return (
    <SelectedZoneContext.Provider value={{ selectedZone, setSelectedZone }}>
      {children}
    </SelectedZoneContext.Provider>
  );
};

export const useSelectedZone = () => {
  const context = useContext(SelectedZoneContext);
  if (!context) {
    throw new Error('useSelectedZone must be used within a SelectedZoneProvider');
  }
  return context;
};