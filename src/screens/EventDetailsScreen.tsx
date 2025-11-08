import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { SafeAreaView } from 'react-native-safe-area-context';

type EventDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EventDetails'
>;

const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { event } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isEventFavorite, setIsEventFavorite] = useState(false);
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setIsEventFavorite(isFavorite(event.id));
  }, [event.id, isFavorite]);

  useEffect(() => {
    // Slide and fade in animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleToggleFavorite = async () => {
    // Animate heart
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    await toggleFavorite(event);
    setIsEventFavorite(!isEventFavorite);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']}  style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {event.imageUrl && (
            <Image
              source={{ uri: event.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <View style={styles.detailsContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>

            <Text style={styles.title}>{event.title}</Text>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📅</Text>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoValue}>{event.date}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>🕐</Text>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoValue}>{event.time}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>{event.location}</Text>
                </View>
              </View>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>About This Event</Text>
              <Text style={styles.description}>{event.fullDescription}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isEventFavorite && styles.favoriteButtonActive,
          ]}
          onPress={handleToggleFavorite}
          activeOpacity={0.8}
        >
          <Animated.Text
            style={[
              styles.favoriteButtonText,
              { transform: [{ scale: heartScale }] },
            ]}
          >
            {isEventFavorite ? '❤️' : '🤍'}
          </Animated.Text>
          <Text
            style={[
              styles.favoriteButtonLabel,
              isEventFavorite && styles.favoriteButtonLabelActive,
            ]}
          >
            {isEventFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  detailsContainer: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    lineHeight: 36,
  },
  infoSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  descriptionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  favoriteButtonActive: {
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  favoriteButtonText: {
    fontSize: 24,
    marginRight: 8,
  },
  favoriteButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  favoriteButtonLabelActive: {
    color: '#dc2626',
  },
});

export default EventDetailsScreen;
