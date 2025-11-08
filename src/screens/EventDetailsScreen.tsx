import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { useTheme } from '../hooks/useTheme';
import { shareEvent } from '../utils/shareEvent';
import { addEventToCalendar } from '../utils/calendarIntegration';
import { scheduleEventNotification } from '../services/notificationService';
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
  const { theme } = useTheme();
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

  const handleShare = async () => {
    await shareEvent(event);
  };

  const handleAddToCalendar = async () => {
    await addEventToCalendar(event);
  };

  const handleSetReminder = async () => {
    Alert.alert(
      'Set Reminder',
      'When would you like to be reminded?',
      [
        {
          text: '1 hour before',
          onPress: () => scheduleEventNotification(event, 60),
        },
        {
          text: '1 day before',
          onPress: () => scheduleEventNotification(event, 1440),
        },
        {
          text: '1 week before',
          onPress: () => scheduleEventNotification(event, 10080),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleBuyTickets = () => {
    navigation.navigate('Ticketing', { event });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingBottom: 180,
    },
    content: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
      backgroundColor: theme.colors.inputBackground,
    },
    detailsContainer: {
      padding: 20,
    },
    categoryBadge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primary,
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
      color: theme.colors.text,
      marginBottom: 24,
      lineHeight: 36,
    },
    infoSection: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
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
      color: theme.colors.textSecondary,
      marginBottom: 2,
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '600',
    },
    actionsSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 24,
      paddingVertical: 16,
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    actionButton: {
      alignItems: 'center',
      padding: 8,
    },
    actionIcon: {
      fontSize: 28,
      marginBottom: 4,
    },
    actionLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    descriptionSection: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      lineHeight: 26,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.card,
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
    footerButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    favoriteButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.inputBackground,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    favoriteButtonActive: {
      backgroundColor: '#fef2f2',
      borderColor: '#fca5a5',
    },
    favoriteButtonText: {
      fontSize: 20,
      marginRight: 6,
    },
    favoriteButtonLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    favoriteButtonLabelActive: {
      color: '#dc2626',
    },
    buyButton: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buyButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
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

            <View style={styles.actionsSection}>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Text style={styles.actionIcon}>📤</Text>
                <Text style={styles.actionLabel}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleAddToCalendar}>
                <Text style={styles.actionIcon}>📆</Text>
                <Text style={styles.actionLabel}>Calendar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleSetReminder}>
                <Text style={styles.actionIcon}>🔔</Text>
                <Text style={styles.actionLabel}>Remind</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>About This Event</Text>
              <Text style={styles.description}>{event.fullDescription}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButtons}>
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
              {isEventFavorite ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyButton}
            onPress={handleBuyTickets}
            activeOpacity={0.8}
          >
            <Text style={styles.buyButtonText}>
              Buy Tickets ${event.price || 25}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;
