import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
    // State for the map's region (default location set to Helsinki)
  const [region, setRegion] = useState({
    latitude: 60.1695,
    longitude: 24.9354,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // State to hold the list of markers
  const [markers, setMarkers] = useState([]);
  // State for dialog visibility
  const [dialogVisible, setDialogVisible] = useState(false);
  // State for new place input
  const [newPlace, setNewPlace] = useState({ city: '', description: '' });

  // Load saved markers from AsyncStorage when the app starts
  useEffect(() => {
    loadMarkers();
  }, []);

  // Load markers from AsyncStorage
  const loadMarkers = async () => {
    try {
      const savedMarkers = await AsyncStorage.getItem('markers');
      if (savedMarkers) {
        setMarkers(JSON.parse(savedMarkers));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load markers.");
    }
  };

  // Save markers to AsyncStorage
  const saveMarkers = async (updatedMarkers) => {
    try {
      await AsyncStorage.setItem('markers', JSON.stringify(updatedMarkers));
    } catch (error) {
      Alert.alert("Error", "Failed to save markers.");
    }
  };

  // Open the dialog for adding a new place
  const openAddPlaceDialog = () => {
    setDialogVisible(true);
  };

  // Fetch coordinates for a given city using Google Geocoding API
  const fetchCoordinates = async (city) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { latitude: location.lat, longitude: location.lng };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location. Please try again.");
      return null;
    }
  };

  // Save a new place with coordinates and description
  const handleSavePlace = async () => {
    if (newPlace.city && newPlace.description) {
      const coordinates = await fetchCoordinates(newPlace.city);
      if (coordinates) {
        const updatedMarkers = [
          ...markers,
          {
            ...newPlace,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        ];
        setMarkers(updatedMarkers);
        saveMarkers(updatedMarkers);
        setDialogVisible(false);
        setNewPlace({ city: '', description: '' });
      }
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.city}
            description={marker.description}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.floatingButton} onPress={openAddPlaceDialog}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Add a New Place</Dialog.Title>
        <Dialog.Input
          label="City"
          placeholder="Enter city name"
          onChangeText={(text) => setNewPlace({ ...newPlace, city: text })}
        />
        <Dialog.Input
          label="Description"
          placeholder="Enter description"
          onChangeText={(text) => setNewPlace({ ...newPlace, description: text })}
        />
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Save" onPress={handleSavePlace} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
