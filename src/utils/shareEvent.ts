import { Share, Platform } from 'react-native';
import { Event } from '../types';

export const shareEvent = async (event: Event): Promise<boolean> => {
  try {
    const message = `Check out this event: ${event.title}\n\n${event.shortDescription}\n\nDate: ${event.date} at ${event.time}\nLocation: ${event.location}`;
    
    const result = await Share.share(
      {
        message: message,
        title: event.title,
        url: event.imageUrl || '', // You can add a deep link here
      },
      {
        dialogTitle: `Share ${event.title}`,
        subject: event.title, // For email sharing on iOS
      }
    );

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
        console.log('Shared with activity type:', result.activityType);
      } else {
        // Shared
        console.log('Event shared successfully');
      }
      return true;
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
      console.log('Share dismissed');
      return false;
    }
    return false;
  } catch (error) {
    console.error('Error sharing event:', error);
    return false;
  }
};
