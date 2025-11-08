import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onPress: () => void;
  animatedValue?: Animated.Value;
}

const EventCard: React.FC<EventCardProps> = memo(({ event, onPress, animatedValue }) => {
  const opacity = animatedValue
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      })
    : 1;

  const translateY = animatedValue
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
      })
    : 0;

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {event.imageUrl && (
          <Image
            source={{ uri: event.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.content}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTime}>📅 {event.date}</Text>
            <Text style={styles.dateTime}>🕐 {event.time}</Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {event.shortDescription}
          </Text>
          <View style={styles.locationContainer}>
            <Text style={styles.location} numberOfLines={1}>
              📍 {event.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

EventCard.displayName = 'EventCard';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#9ca3af',
    flex: 1,
  },
});

export default EventCard;
