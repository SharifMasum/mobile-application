import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_KEY } from '@env';

export default function MovieDetailScreen({ route, navigation }) {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  // Fetch movie details when the component mounts or 'movieId' changes
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`)
      .then((response) => setMovieDetails(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Base URL for movie poster images
  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const posterUrl = IMAGEPATH + movieDetails.poster_path;

  // Helper function to construct video URLs based on their hosting platform
  const getVideoUrl = (video) => {
    switch (video.site) {
      case 'YouTube':
        return `https://www.youtube.com/watch?v=${video.key}`;
      case 'Vimeo':
        return `https://vimeo.com/${video.key}`;
      default:
        return null;
    }
  };

  // Renders the list of videos as clickable buttons
  const renderVideos = () => {
    if (movieDetails.videos && movieDetails.videos.results.length > 0) {
      return movieDetails.videos.results.map((video, index) => {
        const videoUrl = getVideoUrl(video);
        if (!videoUrl) return null;

        return (
          <TouchableOpacity
            key={index}
            style={styles.videoButton}
            onPress={() => navigation.navigate('VideoPlayerScreen', { videoUrl })}
          >
            <Text style={styles.videoText}>
              {video.name} ({video.type}) - {video.site}
            </Text>
          </TouchableOpacity>
        );
      });
    } else {
      return <Text>No videos available for this movie.</Text>;
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={{ uri: posterUrl }} style={styles.poster} />

        <Text style={styles.title}>{movieDetails.title}</Text>
        <Text style={styles.text}>Genres: {movieDetails.genres.map((g) => g.name).join(', ')}</Text>
        <Text style={styles.text}>Release Date: {movieDetails.release_date}</Text>
        <Text style={styles.text}>Homepage: {movieDetails.homepage}</Text>
        <Text style={styles.text}>Overview: {movieDetails.overview}</Text>

        <Text style={styles.sectionTitle}>Available Videos:</Text>
        {renderVideos()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  videoButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  videoText: {
    fontSize: 16,
    color: '#007bff',
  },
});

