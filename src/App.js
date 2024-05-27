import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import MoviePopup from './components/MoviePopup';
import { API_KEY, BASE_URL } from './constant';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState({
    trending: [],
    upcoming: [],
    topRated: []
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      const trendingEndpoint = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`;
      const upcomingEndpoint = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
      const topRatedEndpoint = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

      const trendingMovies = await fetchMovies(trendingEndpoint);
      const upcomingMovies = await fetchMovies(upcomingEndpoint);
      const topRatedMovies = await fetchMovies(topRatedEndpoint);

      // Combine all movie lists
      const allMovies = {
        trending: trendingMovies,
        upcoming: upcomingMovies,
        topRated: topRatedMovies
      };

      setMovies(allMovies);
    };

    fetchMovieData();
  }, []);

  const handleSearch = async (query) => {
    const searchEndpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&pageSize=5`;
    const results = await fetchMovies(searchEndpoint);
    setMovies({ trending: [], upcoming: [], topRated: [], searchResults: results });
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      {error && <p className="error-message">Error fetching movies: {error.message}</p>}
      <div className="movie-list">
        {movies.searchResults && (
          <div className="movie-section">
            {movies.searchResults.map((movie) => (
              <Card key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
            ))}
          </div>
        )}
        {!movies.searchResults && (
          <>
            {movies.trending.length > 0 && (
              <>
                <h2>Trending Movies</h2>
                <div className="movie-section">
                  {movies.trending.map((movie) => (
                    <Card key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
                  ))}
                </div>
              </>
            )}
            {movies.upcoming.length > 0 && (
              <>
                <h2>Upcoming Movies</h2>
                <div className="movie-section">
                  {movies.upcoming.map((movie) => (
                    <Card key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
                  ))}
                </div>
              </>
            )}
            {movies.topRated.length > 0 && (
              <>
                <h2>Top Rated Movies</h2>
                <div className="movie-section">
                  {movies.topRated.map((movie) => (
                    <Card key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      {selectedMovie && <MoviePopup selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />}
    </div>
  );
};

export default App;
