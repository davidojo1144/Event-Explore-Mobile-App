export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  category: string;
  imageUrl?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  price?: number;
  availableTickets?: number;
  organizerId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  purchaseDate: string;
  quantity: number;
  totalPrice: number;
  qrCode?: string;
}

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  EventDetails: { event: Event };
  MapView: undefined;
  Ticketing: { event: Event };
  Profile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  EventList: undefined;
  Favorites: undefined;
  Map: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    error: string;
    success: string;
  };
}
