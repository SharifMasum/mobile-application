import react, {useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import useAxios from 'axios-hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_KEY } from '@env';

const WeatherForecast = (params) => {
    const city = params.city;
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const [{ data, loading, error }, refetch] = useAxios(
        `${URL}${city.name}&appid=${API_KEY}&units=metric`
        )

    if (loading) return (
        <Card>
            <Card.Title>Loading...</Card.Title>
        </Card>
        )
    if (error) return (
        <Card>
            <Card.Title>Error fetching data</Card.Title>
        </Card>
        )

    // Calculate local time for the city
    const localTime = new Intl.DateTimeFormat('en-US', {
            timeZone: `Etc/GMT${data.timezone / 3600 >= 0 ? '-' : '+'}${Math.abs(data.timezone / 3600)}`,
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date());

    const localDate = new Intl.DateTimeFormat('en-US', {
        timeZone: `Etc/GMT${data.timezone / 3600 >= 0 ? '-' : '+'}${Math.abs(data.timezone / 3600)}`,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());

    const storeData = async () => {
        try {
            const value = await AsyncStorage.setItem('@cities', JSON.stringify(cities));
        } catch (e) {
            console.log("Error saving data");
        }
    }

    const refreshForecast = () => {
            refetch();
        };

    const deleteCity = () => {
      params.deleteCity(city.id);
    }

    console.log(data);

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    return (
        <Card>
            <Card.Title>{city.name}: {localDate} {localTime}</Card.Title>
            <View style={styles.row}>
                <View style={styles.textContainer}>
                    <Text>Main: {data.weather[0].main}</Text>
                    <Text>Temp: {data.main.temp}°C</Text>
                    <Text>Feels: {data.main.feels_like}°C</Text>
                    <Text>Min: {data.main.temp_min}°C</Text>
                    <Text>Max: {data.main.temp_max}°C</Text>
                </View>
                <Image
                    source={{ uri: iconUrl }}
                    style={styles.icon}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={deleteCity}>
                    <Text style={styles.deleteCity}>Delete</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={refreshForecast}>
                    <Text style={styles.refreshCity}>Refresh</Text>
                </TouchableOpacity>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        margin: 10,
    },
    icon: {
        width: 100,
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        margin: 10,
    },
    deleteCity: {
        color: 'blue',
        fontSize: 16,
        textAlign: 'center',
    },
    refreshCity: {
        color: 'blue',
        fontSize: 16,
        textAlign: 'space-between',
    }
});

export default WeatherForecast;