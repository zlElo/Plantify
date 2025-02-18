// Overlay.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OverlayProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

interface PlantData {
  id: string;
  name: string;
  description: string;
  date: string;
  season: string;
  notes: string;
}

const Overlay: React.FC<OverlayProps> = ({ isVisible, setIsVisible }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [season, setSeason] = useState('Frühling');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const seasons = ['Frühling', 'Sommer', 'Herbst', 'Winter'];

  useEffect(() => {
    if (isVisible) {
      resetForm();
    }
  }, [isVisible]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setDate(new Date());
    setSeason('Frühling');
    setNotes('');
  };

  const saveData = async () => {
    try {
      const newPlantData: PlantData = {
        id: Date.now().toString(), // Unique ID based on current timestamp
        name,
        description,
        date: date.toISOString(),
        season,
        notes
      };
  
      // Get existing plants
      const existingPlantsJson = await AsyncStorage.getItem('@plantData');
      let existingPlants: PlantData[] = existingPlantsJson ? JSON.parse(existingPlantsJson) : [];
  
      // Überprüfen, ob existingPlants ein Array ist
      if (!Array.isArray(existingPlants)) {
        existingPlants = [];
      }
  
      // Add new plant to the list
      existingPlants.push(newPlantData);
  
      // Save updated list back to AsyncStorage
      await AsyncStorage.setItem('@plantData', JSON.stringify(existingPlants));
  
      console.log('Neue Pflanze hinzugefügt:', newPlantData);
      setIsVisible(false);
      resetForm();
    } catch (error) {
      console.error('Fehler beim Speichern der Daten:', error);
    }
  };

  const simpleClose = () => {
    setIsVisible(false);
    resetForm();
  };

  return (
    <Modal visible={isVisible} onRequestClose={() => setIsVisible(false)}>
      <View style={styles.modalContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.formContainer}>
            <View style={styles.box}>
              <Text style={styles.label}>Name der Pflanze:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.box}>
            <Text style={styles.label}>Anzahl:</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={(text) => setDescription(text)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.box}>
              <Text style={styles.label}>Datum:</Text>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            </View>

            <View style={styles.box}>
              <Text style={styles.label}>Jahreszeit:</Text>
              {seasons.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.listItem,
                    season === item && styles.selectedItem
                  ]}
                  onPress={() => setSeason(item)}
                >
                  <Text style={[
                    styles.listItemText,
                    season === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.box}>
            <Text style={styles.label}>Anmerkungen:</Text>
              <TextInput
                style={styles.input}
                value={notes}
                onChangeText={(text) => setNotes(text)}
                multiline
              />
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 10}}>
            <Button 
                title="Speichern" 
                onPress={saveData}
                color="#4CAF50"
            />
            <Button 
                title="Abbrechen" 
                onPress={simpleClose}
                color="#ff0000"
            />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        padding: 20,
      },
      scrollView: {
        width: '100%',
      },
      scrollContentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20, 
      },
      formContainer: {
        padding: 10,
      },
      box: {
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
      input: {
        height: 40,
        borderColor: '#81C784',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
      },
      buttonContainer: {
        marginTop: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#4CAF50',
      },
      listItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#81C784',
        borderRadius: 5,
        marginBottom: 5,
      },
      selectedItem: {
        backgroundColor: '#4CAF50',
      },
      listItemText: {
        color: '#4CAF50',
      },
      selectedItemText: {
        color: '#FFFFFF',
      },
});

export default Overlay;
