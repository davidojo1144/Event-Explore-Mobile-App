import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search events...',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔍</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    position: 'relative',
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 44,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconContainer: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  icon: {
    fontSize: 20,
  },
});

export default SearchBar;
