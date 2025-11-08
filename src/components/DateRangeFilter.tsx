import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface DateRangeFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = memo((
  startDate,
  endDate,
  onDateRangeChange,
}) => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select Date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const clearDates = () => {
    onDateRangeChange(null, null);
    setShowModal(false);
  };

  const setPresetRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onDateRangeChange(start, end);
    setShowModal(false);
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    buttonText: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: '500',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 20,
      width: '85%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    presetButton: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    presetButtonText: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      fontWeight: '500',
    },
    clearButton: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.error,
      borderRadius: 8,
      marginTop: 10,
    },
    clearButtonText: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      fontWeight: '600',
    },
    closeButton: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.border,
      borderRadius: 8,
      marginTop: 10,
    },
    closeButtonText: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          📅 {startDate && endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : 'Filter by Date Range'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Date Range</Text>

              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => setPresetRange(7)}
              >
                <Text style={styles.presetButtonText}>Last 7 Days</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => setPresetRange(30)}
              >
                <Text style={styles.presetButtonText}>Last 30 Days</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => setPresetRange(90)}
              >
                <Text style={styles.presetButtonText}>Last 90 Days</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearDates}
              >
                <Text style={styles.clearButtonText}>Clear Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

DateRangeFilter.displayName = 'DateRangeFilter';

export default DateRangeFilter;
