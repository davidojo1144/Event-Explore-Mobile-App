import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Animated,
  Text,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

type EventListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

interface EventListScreenProps {
  navigation: EventListScreenNavigationProp;
}

const EventListScreen: React.FC<EventListScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const animatedValues = useRef(
    mockEvents.map(() => new Animated.Value(0))
  ).current;

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockEvents;
    }
    const query = searchQuery.toLowerCase();
    return mockEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.shortDescription.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Animate items on mount
  React.useEffect(() => {
    Animated.stagger(
      50,
      animatedValues.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Navigate to event details
  const handleEventPress = useCallback(
    (event: typeof mockEvents[0]) => {
      navigation.navigate('EventDetails', { event });
    },
    [navigation]
  );

  // Render event card
  const renderItem = useCallback(
    ({ item, index }: { item: typeof mockEvents[0]; index: number }) => (
      <EventCard
        event={item}
        onPress={() => handleEventPress(item)}
        animatedValue={animatedValues[index]}
      />
    ),
    [handleEventPress, animatedValues]
  );

  // Key extractor for FlatList optimization
  const keyExtractor = useCallback((item: typeof mockEvents[0]) => item.id, []);

  // Get item layout for FlatList optimization
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 300,
      offset: 300 * index,
      index,
    }),
    []
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']}  style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Events</Text>
        <Text style={styles.headerSubtitle}>
          Find amazing events happening near you
        </Text>
      </View>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search events..."
      />
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No Events Found"
          message={
            searchQuery
              ? `No events match "${searchQuery}". Try a different search term.`
              : 'No events available at the moment.'
          }
        />
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6366f1"
              colors={['#6366f1']}
            />
          }
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
    paddingBottom: 8,
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

export default EventListScreen;
