import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types';

const FAVORITES_KEY = '@event_explorer_favorites';

interface FavoritesContextType {
  favorites: Event[];
  loading: boolean;
  addFavorite: (event: Event) => Promise<void>;
  removeFavorite: (eventId: string) => Promise<void>;
  toggleFavorite: (event: Event) => Promise<void>;
  isFavorite: (eventId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: Event[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw error;
    }
  };

  const addFavorite = useCallback(
    async (event: Event) => {
      const newFavorites = [...favorites, event];
      await saveFavorites(newFavorites);
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    async (eventId: string) => {
      const newFavorites = favorites.filter((fav) => fav.id !== eventId);
      await saveFavorites(newFavorites);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (event: Event) => {
      const isFav = favorites.some((fav) => fav.id === event.id);
      if (isFav) {
        await removeFavorite(event.id);
      } else {
        await addFavorite(event);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (eventId: string) => {
      return favorites.some((fav) => fav.id === eventId);
    },
    [favorites]
  );

  const refreshFavorites = useCallback(async () => {
    await loadFavorites();
  }, []);

  const value: FavoritesContextType = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    refreshFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
