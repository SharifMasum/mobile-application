import React, { useState } from 'react';
import { View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Platform,
    Linking,
    Alert } from 'react-native';

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const launchMap = () => {
    if (!latitude || !longitude) {
      Alert.alert('Error', 'Please enter valid latitude and longitude values.');
      return;
    }

    const location = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });

    Linking.openURL(url).catch(err => Alert.alert('Error', 'Failed to launch map.'));
  };

  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text>Give a latitude value:</Text>
        </View>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        keyboardType="numeric"
        onChangeText={text => setLatitude(text)}
      />

      <View style={styles.title}>
        <Text>Give a longitude value:</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        keyboardType="numeric"
        onChangeText={text => setLongitude(text)}
      />
      <Button title="Launch a Map" onPress={launchMap} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
    title: {
        marginBottom: 8,
        fontWeight: 'bold',
    },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default App;
