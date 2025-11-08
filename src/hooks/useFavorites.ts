import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types';

const FAVORITES_KEY = '@event_explorer_favorites';

export const useFavorites = () => {
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
      const isFavorite = favorites.some((fav) => fav.id === event.id);
      if (isFavorite) {
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

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
