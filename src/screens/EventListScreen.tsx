import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import CategoryFilter from '../components/CategoryFilter';
import DateRangeFilter from '../components/DateRangeFilter';
import { useTheme } from '../hooks/useTheme';
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  
  const animatedValues = useRef(
    mockEvents.map(() => new Animated.Value(0))
  ).current;

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(mockEvents.map(event => event.category));
    return Array.from(cats).sort();
  }, []);

  // Filter events based on search query, category, and date range
  const filteredEvents = useMemo(() => {
    let filtered = mockEvents;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.shortDescription.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, startDate, endDate]);

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

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      backgroundColor: theme.colors.card,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    mapButton: {
      padding: 8,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
    },
    mapButtonText: {
      fontSize: 24,
    },
    listContent: {
      paddingBottom: 16,
    },
    filterInfo: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    filterInfoText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Discover Events</Text>
          <Text style={styles.headerSubtitle}>
            Find amazing events happening near you
          </Text>
        </View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate('MapView')}
        >
          <Text style={styles.mapButtonText}>🗺️</Text>
        </TouchableOpacity>
      </View>
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search events..."
      />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onDateRangeChange={handleDateRangeChange}
      />

      {(selectedCategory || (startDate && endDate)) && (
        <View style={styles.filterInfo}>
          <Text style={styles.filterInfoText}>
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            {selectedCategory && ` in ${selectedCategory}`}
            {startDate && endDate && ` from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
          </Text>
        </View>
      )}
      
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No Events Found"
          message={
            searchQuery
              ? `No events match "${searchQuery}". Try a different search term.`
              : 'No events available with the selected filters.'
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
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
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

export default EventListScreen;
