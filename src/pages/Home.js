import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTrendingMovies, searchMovies } from '../utility/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  Switch,
  Box,
  Button,
  IconButton,
  Badge,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Home({ mode, setMode }) {
  const navigate = useNavigate();

  // State variables for movie data, query, pagination, filters, etc.
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(localStorage.getItem('lastSearch') || ''); //Store the user’s last searched movie in local storage for persistence
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Favorites saved in localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteMovies');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter states
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  // Color palette depending on theme mode
  const isDark = mode === 'dark';
  const colors = {
    background: isDark ? '#0A192F' : '#fff',
    text: isDark ? '#CCD6F6' : '#0A192F',
    accent: isDark ? '#64FFDA' : '#0A192F',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
  };

  // Toggle between dark and light mode
  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Save favorites to localStorage when changed
  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove movie from favorites
  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === movie.id);
      return isFavorite ? prev.filter((fav) => fav.id !== movie.id) : [...prev, movie];
    });
  };

  // Load movies (search or trending), apply filters
  const loadMovies = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError('');

        const res = query
          ? await searchMovies(query, reset ? 1 : page)
          : await fetchTrendingMovies(reset ? 1 : page);

        let newMovies = res.data.results;

        // Apply filters
        if (genre) {
          newMovies = newMovies.filter((m) => m.genre_ids.includes(Number(genre)));
        }
        if (year) {
          newMovies = newMovies.filter((m) => m.release_date?.startsWith(year));
        }
        if (rating) {
          newMovies = newMovies.filter((m) => m.vote_average >= Number(rating));
        }

        // Set movie state
        setMovies((prev) => (reset ? newMovies : [...prev, ...newMovies]));
        setHasMore(res.data.page < res.data.total_pages);
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching movies.');
      } finally {
        setLoading(false);
      }
    },
    [query, page, genre, year, rating]
  );

  // Reload movies when filters or query change
  useEffect(() => {
    setPage(1);
    loadMovies(true);
  }, [query, genre, year, rating, loadMovies]);

  // Load more movies when page changes (pagination)
  useEffect(() => {
    if (page !== 1) loadMovies();
  }, [page, loadMovies]);

  // Handle search input
  const handleSearch = (text) => {
    setQuery(text);
    localStorage.setItem('lastSearch', text);
    setPage(1);
    setMovies([]);
  };

  return (
    <>
      {/* AppBar Header */}
      <AppBar
        position="static"
        sx={{ background: colors.background, boxShadow: 'none', borderBottom: colors.border }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0,
              fontFamily: "'Poppins', sans-serif",
              color: colors.accent,
              textTransform: 'uppercase',
            }}
          >
            Movie Explorer - Discover Your Favorite Films
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {/* Go Back Button */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/login')}
              sx={{ color: colors.accent, borderColor: colors.accent, textTransform: 'none' }}
              variant="outlined"
            >
              Go Back
            </Button>

            {/* Favorites */}
            <IconButton onClick={() => navigate('/favorites')} sx={{ color: colors.accent }}>
              <Badge badgeContent={favorites.length} color="error">
                <BookmarkIcon />
              </Badge>
            </IconButton>

            {/* Light/Dark Mode Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1, color: colors.text }}>
                {mode === 'light' ? 'Light' : 'Dark'}
              </Typography>
              <Switch checked={mode === 'dark'} onChange={toggleMode} color="default" />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container sx={{ mt: 4, mb: 6 }}>
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} mode={mode} />

        {/* Filters */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 3,
            flexWrap: 'wrap',
          }}
        >
          {/* Genre Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Genre</InputLabel>
            <Select value={genre} onChange={(e) => setGenre(e.target.value)} label="Genre">
              <MenuItem value="">All</MenuItem>
              <MenuItem value={28}>Action</MenuItem>
              <MenuItem value={35}>Comedy</MenuItem>
              <MenuItem value={18}>Drama</MenuItem>
              <MenuItem value={27}>Horror</MenuItem>
              <MenuItem value={10749}>Romance</MenuItem>
              <MenuItem value={878}>Sci-Fi</MenuItem>
            </Select>
          </FormControl>

          {/* Year Filter */}
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
              <MenuItem value="">All</MenuItem>
              {Array.from({ length: 20 }, (_, i) => 2024 - i).map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Rating Filter */}
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)} label="Rating">
              <MenuItem value="">All</MenuItem>
              {[...Array(9).keys()].map((i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}+
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            mt: 5,
            mb: 4,
            color: colors.text,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {query.trim() ? `Search Results for "${query}"` : '🔥 Trending Now'}
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Movie Cards Grid */}
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard
                movie={movie}
                mode={mode}
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
                onToggleFavorite={() => toggleFavorite(movie)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Loading Spinner */}
        {loading && (
          <Box sx={{ textAlign: 'center', mt: 6, py: 4 }}>
            <CircularProgress sx={{ color: colors.accent }} />
          </Box>
        )}

        {/* Load More Button */}
        {!loading && hasMore && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              sx={{ color: colors.accent, borderColor: colors.accent }}
              variant="outlined"
            >
              Load More
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Home;
