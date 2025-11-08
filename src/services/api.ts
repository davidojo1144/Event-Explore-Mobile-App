import { Event, User, Ticket } from '../types';

// Mock API base URL - replace with your actual API endpoint
const API_BASE_URL = 'https://api.example.com';

// Mock API delay to simulate network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Events
  async getEvents(): Promise<Event[]> {
    await delay(1000);
    // In production, replace with actual API call:
    // const response = await fetch(`${API_BASE_URL}/events`);
    // return response.json();
    
    // For now, return mock data
    const { mockEvents } = require('../data/mockEvents');
    return mockEvents;
  },

  async getEventById(id: string): Promise<Event | null> {
    await delay(500);
    const { mockEvents } = require('../data/mockEvents');
    return mockEvents.find((event: Event) => event.id === id) || null;
  },

  async searchEvents(query: string): Promise<Event[]> {
    await delay(800);
    const { mockEvents } = require('../data/mockEvents');
    const lowerQuery = query.toLowerCase();
    return mockEvents.filter((event: Event) =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.shortDescription.toLowerCase().includes(lowerQuery) ||
      event.category.toLowerCase().includes(lowerQuery)
    );
  },

  async getEventsByCategory(category: string): Promise<Event[]> {
    await delay(800);
    const { mockEvents } = require('../data/mockEvents');
    return mockEvents.filter((event: Event) => event.category === category);
  },

  async getEventsByDateRange(startDate: string, endDate: string): Promise<Event[]> {
    await delay(800);
    const { mockEvents } = require('../data/mockEvents');
    return mockEvents.filter((event: Event) => {
      const eventDate = new Date(event.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return eventDate >= start && eventDate <= end;
    });
  },

  // Authentication
  async login(email: string, password: string): Promise<User> {
    await delay(1000);
    // Mock login - replace with actual API call
    return {
      id: '1',
      email: email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff`,
    };
  },

  async signup(email: string, password: string, name: string): Promise<User> {
    await delay(1000);
    // Mock signup - replace with actual API call
    return {
      id: Date.now().toString(),
      email: email,
      name: name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff`,
    };
  },

  async logout(): Promise<void> {
    await delay(500);
    // Mock logout - replace with actual API call
  },

  // Tickets
  async purchaseTicket(eventId: string, userId: string, quantity: number): Promise<Ticket> {
    await delay(1500);
    // Mock ticket purchase - replace with actual API call
    const { mockEvents } = require('../data/mockEvents');
    const event = mockEvents.find((e: Event) => e.id === eventId);
    
    return {
      id: Date.now().toString(),
      eventId: eventId,
      userId: userId,
      purchaseDate: new Date().toISOString(),
      quantity: quantity,
      totalPrice: (event?.price || 0) * quantity,
      qrCode: `QR-${Date.now()}`,
    };
  },

  async getUserTickets(userId: string): Promise<Ticket[]> {
    await delay(800);
    // Mock get user tickets - replace with actual API call
    return [];
  },

  // Favorites (if you want to sync with backend)
  async getFavorites(userId: string): Promise<Event[]> {
    await delay(800);
    // Mock get favorites - replace with actual API call
    return [];
  },

  async addFavorite(userId: string, eventId: string): Promise<void> {
    await delay(500);
    // Mock add favorite - replace with actual API call
  },

  async removeFavorite(userId: string, eventId: string): Promise<void> {
    await delay(500);
    // Mock remove favorite - replace with actual API call
  },
};
