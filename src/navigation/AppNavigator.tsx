import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../types';
import EventListScreen from '../screens/EventListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="EventList"
        component={EventListScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🎉" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="❤️" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Custom Tab Icon Component
const TabIcon = ({ icon, size }: { icon: string; color: string; size: number }) => {
  return <Text style={{ fontSize: size }}>{icon}</Text>;
};

// Root Stack Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{
            title: 'Event Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
