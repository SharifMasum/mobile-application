import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';
import VideoPlayerScreen from './VideoPlayerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen name="MovieList" component={MovieListScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
        <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}