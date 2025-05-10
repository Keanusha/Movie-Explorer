import React, { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function MovieCard({ movie, isFavorite: propIsFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const { favorites, addFavorite } = useContext(MovieContext);

 
  const isFavorite =
    typeof propIsFavorite === 'boolean'
      ? propIsFavorite
      : favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    } else if (!isFavorite) {
      addFavorite(movie);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.3s',
          '&:hover': { transform: 'scale(1.03)' },
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average}
          </Typography>
        </CardContent>

       
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 2,
          }}
        >
          <Tooltip title={isFavorite ? 'Added to Favorites' : 'Add to Favorites'}>
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                padding: '4px',
              }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: '22px',
                  color: isFavorite ? '#FF0000' : '#FFFFFF',
                  stroke: 'black',
                  strokeWidth: 1.5,
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
    </Grid>
  );
}

export default MovieCard;
