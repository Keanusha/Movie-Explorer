import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';

function Favorites({ mode }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteMovies');
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const isDark = mode === 'dark';
  const colors = {
    text: isDark ? '#CCD6F6' : '#0A192F'
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: colors.text }}>
        Your Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" sx={{ color: colors.text }}>
          You have not added any favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} mode={mode} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites;
