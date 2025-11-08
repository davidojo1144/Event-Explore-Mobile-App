# 🎉 Event Explorer App

A modern, feature-rich React Native mobile application built with Expo and TypeScript for discovering and managing upcoming events. Browse events, view detailed information, and save your favorites with persistent local storage.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

## ✨ Features

### Core Features

- **📱 Event List Screen**: Scrollable list of upcoming events with beautiful card designs
- **🔍 Search Functionality**: Real-time search to filter events by title, description, category, or location
- **📄 Event Details Screen**: Comprehensive event information with smooth animations
- **❤️ Favorites Management**: Add/remove events from favorites with animated heart icon
- **💾 Persistent Storage**: Favorites saved locally using AsyncStorage
- **🔄 Pull-to-Refresh**: Refresh event list with a simple pull gesture

### Bonus Features

- **⚡ Performance Optimizations**:
  - FlatList optimizations (keyExtractor, memoization, getItemLayout)
  - React.memo for component optimization
  - Efficient re-rendering strategies
- **🎨 Smooth Animations**:
  - Fade-in animations for list items
  - Slide transitions between screens
  - Heart animation on favorite toggle
  - Staggered list animations
- **🎯 Clean Architecture**: Modular code structure with separation of concerns
- **📱 Responsive Design**: Works seamlessly on both iOS and Android devices

## 🏗️ Project Structure

```
event-explorer-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── EventCard.tsx    # Event card component with animations
│   │   ├── SearchBar.tsx    # Search input component
│   │   └── EmptyState.tsx   # Empty state placeholder
│   ├── screens/             # Screen components
│   │   ├── EventListScreen.tsx      # Main event list with search
│   │   ├── EventDetailsScreen.tsx   # Detailed event view
│   │   └── FavoritesScreen.tsx      # Favorites list
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx # Stack & Tab navigation setup
│   ├── hooks/               # Custom React hooks
│   │   └── useFavorites.ts  # Favorites management hook
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types and interfaces
│   └── data/                # Mock data
│       └── mockEvents.ts    # Sample event data
├── App.tsx                  # Root component
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── app.json                 # Expo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Clone or navigate to the project directory**:

   ```bash
   cd event-explorer-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

   or

   ```bash
   npx expo start
   ```

4. **Run on your device**:
   - **iOS**: Press `i` in the terminal or scan the QR code with the Expo Go app
   - **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
   - **Web**: Press `w` in the terminal (experimental)

### Alternative Run Commands

```bash
# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

## 📱 App Screens

### 1. Event List Screen

- Displays all upcoming events in a scrollable list
- Search bar for filtering events
- Pull-to-refresh functionality
- Smooth fade-in animations
- Tap any event to view details

### 2. Event Details Screen

- Full event information including:
  - Event title and category
  - Date and time
  - Location
  - Complete description
  - Event image
- Add/Remove from favorites with animated heart button
- Smooth slide-in animation on screen load

### 3. Favorites Screen

- Shows all favorited events
- Same card design as Event List
- Remove events from favorites
- Empty state when no favorites exist
- Persistent across app restarts

## 🛠️ Technical Implementation

### State Management

- **React Hooks**: useState, useEffect, useCallback, useMemo, useRef
- **Custom Hooks**: useFavorites for centralized favorites management
- **AsyncStorage**: Persistent local storage for favorites

### Navigation

- **React Navigation v6**: Latest navigation library
- **Stack Navigator**: For screen transitions
- **Bottom Tab Navigator**: For main app sections
- **Type-safe Navigation**: Full TypeScript support

### Performance Optimizations

- **FlatList Optimizations**:
  - `keyExtractor` for unique keys
  - `getItemLayout` for known item dimensions
  - `removeClippedSubviews` for memory efficiency
  - `maxToRenderPerBatch` and `windowSize` tuning
- **Component Memoization**: React.memo for preventing unnecessary re-renders
- **Callback Memoization**: useCallback for stable function references
- **Computed Values**: useMemo for expensive calculations

### Animations

- **React Native Animated API**: Smooth, performant animations
- **Staggered Animations**: Sequential fade-in for list items
- **Interpolation**: Dynamic value transformations
- **Native Driver**: Hardware-accelerated animations

## 🎨 Design Decisions

### Color Scheme

- **Primary**: Indigo (#6366f1) - Modern and professional
- **Background**: Light gray (#f9fafb) - Easy on the eyes
- **Text**: Dark gray (#1f2937) - High readability
- **Accents**: Various grays for hierarchy

### Typography

- **Headers**: Bold, large fonts for emphasis
- **Body**: Medium-sized, readable fonts
- **Labels**: Smaller, subtle fonts for secondary info

### User Experience

- **Intuitive Navigation**: Bottom tabs for main sections
- **Visual Feedback**: Animations and color changes on interactions
- **Empty States**: Helpful messages when no content available
- **Loading States**: Clear indication of data loading
- **Error Handling**: Graceful error management

## 📦 Dependencies

### Core Dependencies

- **expo**: ~54.0.0 - Expo SDK
- **react**: 18.3.1 - React library
- **react-native**: 0.76.5 - React Native framework
- **@react-navigation/native**: ^6.1.18 - Navigation library
- **@react-navigation/native-stack**: ^6.11.0 - Stack navigator
- **@react-navigation/bottom-tabs**: ^6.6.1 - Tab navigator
- **@react-native-async-storage/async-storage**: ~2.1.0 - Local storage
- **react-native-safe-area-context**: ~4.12.0 - Safe area handling
- **react-native-screens**: ~4.3.0 - Native screen optimization
- **expo-status-bar**: ~2.0.0 - Status bar component

### Dev Dependencies

- **typescript**: ^5.3.3 - TypeScript compiler
- **@types/react**: ~18.3.12 - React type definitions
- **@babel/core**: ^7.25.2 - Babel compiler

## 🔄 Data Flow

1. **App Launch**:

   - App.tsx initializes the navigation
   - useFavorites hook loads saved favorites from AsyncStorage

2. **Event List**:

   - Mock events displayed in FlatList
   - Search query filters events in real-time
   - Pull-to-refresh simulates data refresh

3. **Event Details**:

   - Event data passed via navigation params
   - Favorite status checked on mount
   - Toggle favorite updates AsyncStorage

4. **Favorites**:
   - Displays events from favorites state
   - Updates in real-time when favorites change
   - Persists across app restarts

## 🧪 Testing the App

### Manual Testing Checklist

- [ ] Browse event list and verify all events display correctly
- [ ] Search for events by different criteria (title, category, location)
- [ ] Pull down to refresh the event list
- [ ] Tap an event to view details
- [ ] Add an event to favorites
- [ ] Navigate to Favorites tab and verify event appears
- [ ] Remove event from favorites
- [ ] Close and reopen app to verify favorites persist
- [ ] Test on both iOS and Android (if possible)

## 🚧 Future Enhancements

- [ ] Add event categories filter
- [ ] Implement date range filtering
- [ ] Add map view for event locations
- [ ] Enable event sharing
- [ ] Add calendar integration
- [ ] Implement push notifications
- [ ] Add user authentication
- [ ] Connect to real API backend
- [ ] Add event registration/ticketing
- [ ] Implement dark mode

## 📝 Development Approach

### Planning Phase

1. Analyzed requirements and identified core features
2. Designed component hierarchy and data flow
3. Chose appropriate libraries and tools
4. Created modular folder structure

### Implementation Phase

1. Set up project with Expo and TypeScript
2. Created type definitions for type safety
3. Built reusable components (EventCard, SearchBar, EmptyState)
4. Implemented screen components with full functionality
5. Set up navigation with React Navigation
6. Added AsyncStorage for data persistence
7. Implemented performance optimizations
8. Added animations for better UX

### Testing Phase

1. Tested all features on iOS and Android
2. Verified data persistence
3. Checked performance with large lists
4. Ensured responsive design on different screen sizes

## 👨‍💻 Author

Built with ❤️ using React Native, TypeScript, and Expo

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Event Exploring! 🎉**
