import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { mockEvents } from '../data/mockEvents';
import { useTheme } from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

type MapViewScreenProps = NativeStackScreenProps<RootStackParamList, 'MapView'>;

// San Francisco coordinates as default
const DEFAULT_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const MapViewScreen: React.FC<MapViewScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Add mock coordinates to events that don't have them
  const eventsWithCoordinates = mockEvents.map((event, index) => ({
    ...event,
    coordinates: event.coordinates || {
      latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
      longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
    },
  }));

  const handleMarkerPress = (eventId: string) => {
    setSelectedEvent(eventId);
    const event = eventsWithCoordinates.find(e => e.id === eventId);
    if (event) {
      Alert.alert(
        event.title,
        `${event.date} at ${event.time}\n${event.location}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'View Details',
            onPress: () => navigation.navigate('EventDetails', { event }),
          },
        ]
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    map: {
      flex: 1,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.card,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    backButton: {
      padding: 8,
    },
    backButtonText: {
      fontSize: 24,
      color: theme.colors.primary,
    },
    legend: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: theme.colors.card,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    legendTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    legendText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Map</Text>
        <View style={{ width: 40 }} />
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {eventsWithCoordinates.map((event) => (
          <Marker
            key={event.id}
            coordinate={event.coordinates!}
            title={event.title}
            description={event.location}
            onPress={() => handleMarkerPress(event.id)}
            pinColor={selectedEvent === event.id ? theme.colors.primary : '#FF5252'}
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>📍 {eventsWithCoordinates.length} Events</Text>
        <Text style={styles.legendText}>
          Tap on a marker to view event details
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MapViewScreen;
