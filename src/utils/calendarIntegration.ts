import * as Calendar from 'expo-calendar';
import { Platform, Alert } from 'react-native';
import { Event } from '../types';

export const requestCalendarPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting calendar permissions:', error);
    return false;
  }
};

export const addEventToCalendar = async (event: Event): Promise<boolean> => {
  try {
    // Request permissions
    const hasPermission = await requestCalendarPermissions();
    
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please grant calendar permissions to add events to your calendar.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Get default calendar
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    let defaultCalendar = calendars.find(
      cal => cal.allowsModifications && cal.source.name === 'Default'
    );

    if (!defaultCalendar) {
      defaultCalendar = calendars.find(cal => cal.allowsModifications);
    }

    if (!defaultCalendar) {
      Alert.alert('Error', 'No writable calendar found');
      return false;
    }

    // Parse date and time
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
    
    // Set end time (2 hours after start by default)
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 2);

    // Create calendar event
    const calendarEventId = await Calendar.createEventAsync(defaultCalendar.id, {
      title: event.title,
      startDate: eventDate,
      endDate: endDate,
      location: event.location,
      notes: event.fullDescription,
      timeZone: 'America/Los_Angeles', // Adjust based on your needs
      alarms: [
        { relativeOffset: -60 }, // 1 hour before
        { relativeOffset: -1440 }, // 1 day before
      ],
    });

    if (calendarEventId) {
      Alert.alert(
        'Success',
        'Event has been added to your calendar!',
        [{ text: 'OK' }]
      );
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error adding event to calendar:', error);
    Alert.alert('Error', 'Failed to add event to calendar');
    return false;
  }
};
