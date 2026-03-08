import React, { createContext, useContext, useState, useCallback } from 'react';
import { CITIES, City, getCityById } from '@/data/citiesData';

interface CityContextType {
  cities: City[];
  activeCity: City;
  setActiveCity: (cityId: string) => void;
  addCity: (city: Omit<City, 'id'> & { id?: string }) => void;
  updateCity: (id: string, updates: Partial<City>) => void;
  removeCity: (id: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cities, setCities] = useState<City[]>(CITIES);
  const [activeCityId, setActiveCityId] = useState<string>('tyumen');

  const activeCity = cities.find(c => c.id === activeCityId) || cities[0];

  const setActiveCity = useCallback((cityId: string) => {
    setActiveCityId(cityId);
  }, []);

  const addCity = useCallback((city: Omit<City, 'id'> & { id?: string }) => {
    const newCity: City = {
      ...city,
      id: city.id || city.slug,
    } as City;
    setCities(prev => [...prev, newCity]);
  }, []);

  const updateCity = useCallback((id: string, updates: Partial<City>) => {
    setCities(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const removeCity = useCallback((id: string) => {
    setCities(prev => prev.filter(c => c.id !== id));
    if (activeCityId === id) setActiveCityId(cities[0]?.id || 'tyumen');
  }, [activeCityId, cities]);

  return (
    <CityContext.Provider value={{ cities, activeCity, setActiveCity, addCity, updateCity, removeCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error('useCity must be used within CityProvider');
  return ctx;
};
