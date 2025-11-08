# Event Explorer App - Implementation TODO

## Phase 1: Critical Bug Fixes & Data Enhancement ✅ IN PROGRESS

### 1.1 Fix Favorites Real-time Update Bug

- [ ] Create FavoritesContext for global state management
- [ ] Update useFavorites hook to use context
- [ ] Wrap App with FavoritesProvider
- [ ] Test real-time updates across all screens

### 1.2 Add More Mock Data

- [ ] Add 20+ more diverse events to mockEvents.ts
- [ ] Include various categories, dates, and locations
- [ ] Ensure data quality and variety

## Phase 2: Feature Implementation (Upcoming)

### 2.1 Event Categories Filter

- [ ] Create CategoryFilter component
- [ ] Add filter logic to EventListScreen
- [ ] Add UI for category selection

### 2.2 Date Range Filtering

- [ ] Create DateRangeFilter component
- [ ] Add date filter logic
- [ ] Integrate with EventListScreen

### 2.3 Map View for Event Locations

- [ ] Install react-native-maps
- [ ] Create MapViewScreen
- [ ] Add coordinates to Event type
- [ ] Update navigation

### 2.4 Event Sharing

- [ ] Add share functionality to EventDetailsScreen
- [ ] Create shareEvent utility
- [ ] Test sharing on different platforms

### 2.5 Calendar Integration

- [ ] Install expo-calendar
- [ ] Create calendar integration utility
- [ ] Add "Add to Calendar" button
- [ ] Handle permissions

### 2.6 Push Notifications

- [ ] Install expo-notifications
- [ ] Create notification service
- [ ] Add reminder functionality
- [ ] Configure app.json

### 2.7 User Authentication

- [ ] Create auth screens (Login, Signup, Profile)
- [ ] Create AuthContext
- [ ] Add auth navigation flow
- [ ] Implement mock auth service

### 2.8 Real API Backend Connection

- [ ] Create API service layer
- [ ] Create useEvents hook
- [ ] Add API configuration
- [ ] Update screens to use API

### 2.9 Event Registration/Ticketing

- [ ] Create TicketingScreen
- [ ] Add Ticket type
- [ ] Create TicketCard component
- [ ] Add registration flow

### 2.10 Dark Mode

- [ ] Create ThemeContext
- [ ] Define color schemes
- [ ] Create SettingsScreen
- [ ] Update all screens with theme support

---

**Current Status**: Working on Phase 1.1 - Fixing Favorites Bug
**Last Updated**: 2024
