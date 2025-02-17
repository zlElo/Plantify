import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Plant {
  id: string;
  name: string;
  description: string;
  date: string;
  season: string;
  notes: string;
}

export default function TabTwoScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadPlants = async () => {
    try {
      const plantsJson = await AsyncStorage.getItem('@plantData');
      if (plantsJson) {
        const loadedPlants: Plant[] = JSON.parse(plantsJson);
        setPlants(loadedPlants);
      }
    } catch (error) {
      console.error('Error loading plants:', error);
    }
  };

  useEffect(() => {
    loadPlants(); // Initial load

    // Set up interval to refresh every half second
    intervalRef.current = setInterval(loadPlants, 500);

    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const deletePlant = async (id: string) => {
    try {
      const updatedPlants = plants.filter(plant => plant.id !== id);
      await AsyncStorage.setItem('@plantData', JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const renderPlantItem = ({ item }: { item: Plant }) => (
    <ThemedView style={styles.plantCard}>
      <ThemedText type="title">{item.name}</ThemedText>
      <ThemedText>Anzahl: {item.description}</ThemedText>
      <ThemedText>Datum: {new Date(item.date).toLocaleDateString()}</ThemedText>
      <ThemedText>Jahreszeit: {item.season}</ThemedText>
      <ThemedText>Anmerkungen: {item.notes}</ThemedText>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deletePlant(item.id)}
      >
        <ThemedText style={styles.deleteButtonText}>Löschen</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  const ListHeader = () => (
    <View>
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={plants}
      renderItem={renderPlantItem}
      keyExtractor={item => item.id}
      contentContainerStyle={[styles.plantList, { paddingBottom: 75, paddingTop: 30 }]}
    />
  );
}


const styles = StyleSheet.create({
  headerImageContainer: {
    height: 200,
    backgroundColor: '#D0D0D0',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  plantList: {
    padding: 10,
  },
  plantCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});