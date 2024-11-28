import React from 'react';
import { SafeAreaView, StatusBar, ScrollView } from 'react-native';
import MoviesList from './MoviesList';

const MovieListScreen: () => Node = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MoviesList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieListScreen;
