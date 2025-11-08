import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

interface FavoritesScreenProps {
  navigation: FavoritesScreenNavigationProp;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { favorites, loading } = useFavorites();

  // Navigate to event details
  const handleEventPress = useCallback(
    (event: typeof favorites[0]) => {
      navigation.navigate('EventDetails', { event });
    },
    [navigation]
  );

  // Render event card
  const renderItem = useCallback(
    ({ item }: { item: typeof favorites[0] }) => (
      <EventCard event={item} onPress={() => handleEventPress(item)} />
    ),
    [handleEventPress]
  );

  // Key extractor for FlatList optimization
  const keyExtractor = useCallback((item: typeof favorites[0]) => item.id, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Favorites</Text>
          <Text style={styles.headerSubtitle}>Loading your favorites...</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']}  style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length > 0
            ? `${favorites.length} event${favorites.length !== 1 ? 's' : ''} saved`
            : 'No favorites yet'}
        </Text>
      </View>
      {favorites.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="No Favorites Yet"
          message="Start adding events to your favorites to see them here. Tap the heart icon on any event to save it!"
        />
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default FavoritesScreen;
