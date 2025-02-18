import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Plant {
  id: string;
  name: string;
  description: string;
  date: string;
  season: string;
  quality: string;
  imageUri: string;
}

export default function TabTwoScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [found, setFound] = useState(true);

  const loadPlants = async () => {
    try {
      const plantsJson = await AsyncStorage.getItem('@harvestData');
      if (plantsJson) {
        const loadedPlants: Plant[] = JSON.parse(plantsJson);
        // Compare loaded plants with current state
        if (JSON.stringify(loadedPlants) !== JSON.stringify(plants)) {
          setPlants(loadedPlants);
          setFilteredPlants(loadedPlants);
        }
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
  }, [plants]); // Add plants to the dependency array

  useEffect(() => {
    const filtered = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.season.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length === 0) {
      setFound(false);
    } else {
      setFound(true);
    }
    setFilteredPlants(filtered);
  }, [searchQuery, plants]);

  const deletePlant = async (id: string) => {
    try {
      const updatedPlants = plants.filter(plant => plant.id !== id);
      await AsyncStorage.setItem('@harvestData', JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const pickImage = async (plantId: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedPlants = plants.map(plant =>
        plant.id === plantId ? { ...plant, imageUri: result.assets[0].uri } : plant
      );
      await AsyncStorage.setItem('@harvestData', JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
    }
  };

  const renderPlantItem = ({ item }: { item: Plant }) => (
    <View style={styles.plantContainer}>
      <TouchableOpacity onPress={() => pickImage(item.id)}>
        <Image
          source={{ uri: item.imageUri || 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png' }}
          style={styles.plantImage}
        />
      </TouchableOpacity>
      <ThemedView style={styles.plantCard}>
        <ThemedText type="title">{item.name}</ThemedText>
        <ThemedText>Menge: {item.description}</ThemedText>
        <ThemedText>Datum: {new Date(item.date).toLocaleDateString()}</ThemedText>
        <ThemedText>Jahreszeit: {item.season}</ThemedText>
        <ThemedText>Qualität: {item.quality}/10</ThemedText>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePlant(item.id)}
        >
          <ThemedText style={styles.deleteButtonText}>Löschen</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );

  const ListHeader = () => (
    <View style={{ alignItems: 'center', backgroundColor: 'transparent' }}>
      <ThemedView style={{ marginTop: 45, marginBottom: 20 }}>
        <ThemedText type="title" style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Meine Ernte</ThemedText>
      </ThemedView>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Suche..."
          // value={tempSearchQuery}
          // onChangeText={(text) => setTempSearchQuery(text)}
          onEndEditing={({ nativeEvent: { text: searchQuery } }) => setSearchQuery(searchQuery)}
          autoCorrect={false}
          autoComplete='off'
        />
      </View>
      {!found && (
        <ThemedText>Keine Ergebnisse gefunden.</ThemedText>
      )}
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={filteredPlants}
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
  plantContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  plantCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 35,
    width: '90%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
});
