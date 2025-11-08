# 📁 Event Explorer App - Project Structure

## Complete File Tree

```
event-explorer-app/
│
├── 📱 App.tsx                          # Root application component
├── 📦 package.json                     # Project dependencies and scripts
├── 🔧 tsconfig.json                    # TypeScript configuration
├── ⚙️ app.json                         # Expo configuration
├── 🔨 babel.config.js                  # Babel configuration
├── 🚫 .gitignore                       # Git ignore rules
├── 📖 README.md                        # Main documentation
├── 🚀 SETUP_GUIDE.md                   # Detailed setup instructions
├── ✅ TODO.md                          # Implementation checklist
├── 📋 PROJECT_STRUCTURE.md             # This file
│
├── 📂 src/                             # Source code directory
│   │
│   ├── 📂 components/                  # Reusable UI components
│   │   ├── EventCard.tsx              # Event card with image and info
│   │   ├── SearchBar.tsx              # Search input component
│   │   └── EmptyState.tsx             # Empty state placeholder
│   │
│   ├── 📂 screens/                     # Screen components
│   │   ├── EventListScreen.tsx        # Main event list with search
│   │   ├── EventDetailsScreen.tsx     # Detailed event view
│   │   └── FavoritesScreen.tsx        # Favorites list screen
│   │
│   ├── 📂 navigation/                  # Navigation configuration
│   │   └── AppNavigator.tsx           # Stack & Tab navigation setup
│   │
│   ├── 📂 hooks/                       # Custom React hooks
│   │   └── useFavorites.ts            # Favorites management hook
│   │
│   ├── 📂 types/                       # TypeScript definitions
│   │   └── index.ts                   # Shared types and interfaces
│   │
│   └── 📂 data/                        # Mock data
│       └── mockEvents.ts              # Sample event data (12 events)
│
└── 📂 assets/                          # Static assets
    └── .gitkeep                       # Placeholder for assets

```

## 📄 File Descriptions

### Root Level Files

#### `App.tsx`

- **Purpose**: Main entry point of the application
- **Key Features**:
  - Wraps app with SafeAreaProvider
  - Initializes AppNavigator
  - Sets up StatusBar
- **Dependencies**: expo-status-bar, react-native-safe-area-context

#### `package.json`

- **Purpose**: Project configuration and dependencies
- **Key Sections**:
  - Dependencies: React Native, Expo, Navigation, AsyncStorage
  - Scripts: start, ios, android, web
  - Dev Dependencies: TypeScript, Babel

#### `tsconfig.json`

- **Purpose**: TypeScript compiler configuration
- **Key Settings**:
  - Strict mode enabled
  - Path aliases configured
  - Expo base config extended

#### `app.json`

- **Purpose**: Expo project configuration
- **Key Settings**:
  - App name and slug
  - Icon and splash screen references
  - iOS and Android specific settings

#### `babel.config.js`

- **Purpose**: Babel transpiler configuration
- **Presets**: babel-preset-expo

### Source Directory (`src/`)

#### Components (`src/components/`)

**EventCard.tsx**

- Displays event information in a card format
- Features:
  - Event image with fallback
  - Category badge
  - Title, date, time, location
  - Short description
  - Fade-in animation support
- Props: event, onPress, animatedValue

**SearchBar.tsx**

- Search input component with icon
- Features:
  - Real-time search
  - Clear button
  - Custom placeholder
  - Styled input field
- Props: value, onChangeText, placeholder

**EmptyState.tsx**

- Placeholder for empty lists
- Features:
  - Custom icon
  - Title and message
  - Centered layout
- Props: icon, title, message

#### Screens (`src/screens/`)

**EventListScreen.tsx**

- Main screen showing all events
- Features:
  - FlatList with optimizations
  - Search functionality
  - Pull-to-refresh
  - Staggered animations
  - Navigation to details
- Performance: Memoized callbacks, optimized rendering

**EventDetailsScreen.tsx**

- Detailed view of a single event
- Features:
  - Full event information
  - Large event image
  - Add/Remove favorites button
  - Animated heart icon
  - Slide-in animation
- Navigation: Receives event via route params

**FavoritesScreen.tsx**

- Shows favorited events
- Features:
  - List of saved events
  - Empty state when no favorites
  - Same card design as EventList
  - Real-time updates
- Data: Uses useFavorites hook

#### Navigation (`src/navigation/`)

**AppNavigator.tsx**

- Navigation structure setup
- Features:
  - Bottom Tab Navigator (Events, Favorites)
  - Stack Navigator (Details screen)
  - Custom tab icons
  - Styled navigation bars
- Navigation Types: Fully typed with TypeScript

#### Hooks (`src/hooks/`)

**useFavorites.ts**

- Custom hook for favorites management
- Features:
  - Load favorites from AsyncStorage
  - Save favorites to AsyncStorage
  - Add/Remove favorites
  - Toggle favorite status
  - Check if event is favorite
- Returns: favorites, loading, addFavorite, removeFavorite, toggleFavorite, isFavorite

#### Types (`src/types/`)

**index.ts**

- TypeScript type definitions
- Interfaces:
  - Event: Event data structure
  - RootStackParamList: Stack navigation types
  - MainTabParamList: Tab navigation types

#### Data (`src/data/`)

**mockEvents.ts**

- Sample event data
- Contains: 12 diverse events
- Categories: Technology, Music, Business, Food & Drink, Sports, Art & Culture, Education, Entertainment, Health & Wellness
- Fields: id, title, date, time, shortDescription, fullDescription, location, category, imageUrl

### Assets Directory (`assets/`)

**Purpose**: Store static assets
**Expected Files**:

- icon.png (1024x1024) - App icon
- splash.png (1284x2778) - Splash screen
- adaptive-icon.png (1024x1024) - Android adaptive icon
- favicon.png (48x48) - Web favicon

## 🔄 Data Flow

```
App.tsx
  └── AppNavigator
      ├── MainTabs (Bottom Tab Navigator)
      │   ├── EventListScreen
      │   │   ├── SearchBar
      │   │   ├── EventCard (multiple)
      │   │   └── EmptyState (if no results)
      │   │
      │   └── FavoritesScreen
      │       ├── EventCard (multiple)
      │       └── EmptyState (if no favorites)
      │
      └── EventDetailsScreen (Stack)
          └── Favorite Toggle Button

Data Sources:
- mockEvents.ts → EventListScreen
- AsyncStorage → useFavorites → FavoritesScreen
```

## 🎯 Component Relationships

```
┌─────────────────────────────────────────┐
│           App.tsx (Root)                │
│  ┌─────────────────────────────────┐   │
│  │      AppNavigator               │   │
│  │  ┌──────────────────────────┐  │   │
│  │  │    MainTabs (Bottom)     │  │   │
│  │  │  ┌────────┐  ┌─────────┐ │  │   │
│  │  │  │ Events │  │Favorites│ │  │   │
│  │  │  └────────┘  └─────────┘ │  │   │
│  │  └──────────────────────────┘  │   │
│  │  ┌──────────────────────────┐  │   │
│  │  │  EventDetails (Stack)    │  │   │
│  │  └──────────────────────────┘  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## 📊 State Management

### Local State (useState)

- Search query (EventListScreen)
- Refresh state (EventListScreen)
- Favorite status (EventDetailsScreen)

### Persistent State (AsyncStorage)

- Favorites list (useFavorites hook)

### Derived State (useMemo)

- Filtered events (EventListScreen)

## 🎨 Styling Approach

- **StyleSheet API**: All components use React Native StyleSheet
- **Inline Styles**: Used for dynamic/animated styles
- **Color Scheme**: Consistent across all components
  - Primary: #6366f1 (Indigo)
  - Background: #f9fafb (Light gray)
  - Text: #1f2937 (Dark gray)
  - Secondary: #6b7280 (Medium gray)

## 🚀 Performance Optimizations

### FlatList Optimizations

- keyExtractor
- getItemLayout
- removeClippedSubviews
- maxToRenderPerBatch
- windowSize
- initialNumToRender

### Component Optimizations

- React.memo for EventCard
- useCallback for event handlers
- useMemo for filtered data

### Animation Optimizations

- useNativeDriver: true
- Animated API for smooth animations

## 📦 Dependencies Overview

### Core

- react, react-native, expo

### Navigation

- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs

### Storage

- @react-native-async-storage/async-storage

### UI/UX

- react-native-safe-area-context
- react-native-screens
- expo-status-bar

### Development

- typescript
- @types/react
- @babel/core

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

- Extends expo/tsconfig.base
- Strict mode enabled
- Path aliases for imports

### Babel (`babel.config.js`)

- Uses babel-preset-expo
- Handles JSX transformation

### Expo (`app.json`)

- App metadata
- Platform-specific settings
- Asset references

## 📝 Documentation Files

- **README.md**: Main project documentation
- **SETUP_GUIDE.md**: Detailed setup instructions
- **TODO.md**: Implementation checklist
- **PROJECT_STRUCTURE.md**: This file

---

**This structure provides a clean, scalable, and maintainable codebase for the Event Explorer app.**
