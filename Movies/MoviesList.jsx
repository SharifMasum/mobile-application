import {API_KEY} from '@env';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

function MoviesList(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&append_to_response=videos`)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  }, []);

  const itemPressed = (index) => {
    props.navigation.navigate('MovieDetails', { movie: movies[index] });
  };

  if (movies.length === 0) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Loading, please wait...</Text>
      </View>
    );
  }

  const movieItems = movies.map((movie, index) => {
    return (
      <TouchableHighlight
        onPress={() => itemPressed(index)}
        underlayColor="lightgray"
        key={index}
      >
        <MovieListItem movie={movie} />
      </TouchableHighlight>
    );
  });

  return <ScrollView>{movieItems}</ScrollView>;
}

function MovieListItem(props) {
  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const imageurl = IMAGEPATH + props.movie.poster_path;

  return (
    <View style={styles.movieItem}>
      <View style={styles.movieItemImage}>
        <Image source={{ uri: imageurl }} style={{ width: 99, height: 146 }} />
      </View>
      <View style={{ marginRight: 50 }}>
        <Text style={styles.movieItemTitle}>{props.movie.title}</Text>
        <Text style={styles.movieItemText}>{props.movie.release_date}</Text>
        <Text numberOfLines={6} ellipsizeMode="tail" style={styles.movieItemText}>
          {props.movie.overview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
  },
  movieItemImage: {
    marginRight: 5,
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap',
  },
});

export default MoviesList;
