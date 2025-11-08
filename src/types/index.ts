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
}

export type RootStackParamList = {
  MainTabs: undefined;
  EventDetails: { event: Event };
};

export type MainTabParamList = {
  EventList: undefined;
  Favorites: undefined;
};
