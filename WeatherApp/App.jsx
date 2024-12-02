import React, {useState} from 'react';
import type {Node} from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';

import { Header, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import WeatherForecast from './WeatherForecast';

const App = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [cityName, setCityName] = useState('');
    const [cities, setCities] = useState([]);

    const openDialog = () => {
            setModalVisible(true);
        }
    const addCity = () => {
        setCities([...cities, {id:Math.random(), name:cityName}]);
        setModalVisible(false);
    }
    const cancelCity = () => {
        setModalVisible(false);
    }
    const deleteCity = (id) => {
        setCities(cities.filter(city => city.id !== id));
    }

  return (
    <SafeAreaView>
     <Header
      centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
      rightComponent={{ icon: 'add', color: '#fff', onPress: openDialog }}
    />
    <ScrollView>
      {cities.map(city => (
          <WeatherForecast
              key={city.id}
              city={city}
              deleteCity={() => deleteCity(city.id)}
          />
      ))}
    </ScrollView>
    <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <View>
            <Input
                onChangeText={(text) => setCityName(text)}
                placeholder='Type city name here'
            />
        </View>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
    </Dialog.Container>
    </SafeAreaView>
  );
};

export default App;