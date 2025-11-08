import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { api } from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';

type TicketingScreenProps = NativeStackScreenProps<RootStackParamList, 'Ticketing'>;

const TicketingScreen: React.FC<TicketingScreenProps> = ({ route, navigation }) => {
  const { event } = route.params;
  const { user } = useAuth();
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const ticketPrice = event.price || 25; // Default price if not set
  const totalPrice = ticketPrice * quantity;

  const handlePurchase = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to purchase tickets', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => navigation.navigate('Auth') },
      ]);
      return;
    }

    setLoading(true);
    try {
      const ticket = await api.purchaseTicket(event.id, user.id, quantity);
      Alert.alert(
        'Success!',
        `You've successfully purchased ${quantity} ticket${quantity > 1 ? 's' : ''} for ${event.title}!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to purchase tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      padding: 8,
      marginRight: 8,
    },
    backButtonText: {
      fontSize: 24,
      color: theme.colors.primary,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    content: {
      padding: 20,
    },
    eventTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
    },
    eventDetails: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    section: {
      marginTop: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    quantityButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityButtonDisabled: {
      opacity: 0.5,
    },
    quantityButtonText: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
    },
    quantityText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginHorizontal: 40,
    },
    priceContainer: {
      backgroundColor: theme.colors.card,
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    priceLabel: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    priceValue: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    totalValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    purchaseButton: {
      backgroundColor: theme.colors.primary,
      padding: 18,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 32,
    },
    purchaseButtonDisabled: {
      opacity: 0.6,
    },
    purchaseButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    note: {
      marginTop: 16,
      padding: 16,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 8,
    },
    noteText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: 'center',
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
        <Text style={styles.headerTitle}>Purchase Tickets</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDetails}>📅 {event.date}</Text>
        <Text style={styles.eventDetails}>🕐 {event.time}</Text>
        <Text style={styles.eventDetails}>📍 {event.location}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity === 1 && styles.quantityButtonDisabled,
              ]}
              onPress={decrementQuantity}
              disabled={quantity === 1}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity === 10 && styles.quantityButtonDisabled,
              ]}
              onPress={incrementQuantity}
              disabled={quantity === 10}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Ticket Price</Text>
              <Text style={styles.priceValue}>${ticketPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Quantity</Text>
              <Text style={styles.priceValue}>×{quantity}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
          onPress={handlePurchase}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.purchaseButtonText}>
              Purchase {quantity} Ticket{quantity > 1 ? 's' : ''}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            🔒 Secure payment • Instant confirmation • E-tickets delivered via email
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketingScreen;
