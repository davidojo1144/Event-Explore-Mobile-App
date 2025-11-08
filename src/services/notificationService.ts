import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';
import { Event } from '../types';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please enable notifications to receive event reminders.',
        [{ text: 'OK' }]
      );
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

export const scheduleEventNotification = async (
  event: Event,
  minutesBefore: number = 60
): Promise<string | null> => {
  try {
    const hasPermission = await requestNotificationPermissions();
    
    if (!hasPermission) {
      return null;
    }

    // Parse event date and time
    const eventDate = new Date(event.date);
    const [hours, minutes] = event.time.split(':');
    const isPM = event.time.toLowerCase().includes('pm');
    let hour = parseInt(hours);
    
    if (isPM && hour !== 12) {
      hour += 12;
    } else if (!isPM && hour === 12) {
      hour = 0;
    }
    
    eventDate.setHours(hour, parseInt(minutes) || 0, 0, 0);
    
    // Calculate notification time
    const notificationDate = new Date(eventDate);
    notificationDate.setMinutes(notificationDate.getMinutes() - minutesBefore);
    
    // Don't schedule if the time has passed
    if (notificationDate <= new Date()) {
      Alert.alert('Notice', 'Event time is too soon to schedule a reminder.');
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Upcoming Event: ${event.title}`,
        body: `${event.title} starts in ${minutesBefore} minutes at ${event.location}`,
        data: { eventId: event.id },
        sound: true,
      },
      trigger: notificationDate,
    });

    Alert.alert(
      'Reminder Set',
      `You'll be notified ${minutesBefore} minutes before the event.`,
      [{ text: 'OK' }]
    );

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    Alert.alert('Error', 'Failed to schedule notification');
    return null;
  }
};

export const cancelNotification = async (notificationId: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};

export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
};
