import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos
} from '../utility/api';
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Grid,

} from '@mui/material';
import {
  Star as StarIcon,
  Theaters as TheatersIcon,
  People as PeopleIcon,
  Person as PersonIcon
} from '@mui/icons-material';

function MoviePage({ mode }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
          fetchMovieVideos(id),
        ]);
        setMovie(detailsRes.data);
        setCredits(creditsRes.data);
        setVideos(videosRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          Movie not found.
        </Typography>
      </Box>
    );
  }

  const trailer = videos?.results?.find((v) => v.type === 'Trailer');
  const director = credits?.crew?.find((person) => person.job === 'Director');
  const topCast = credits?.cast?.slice(0, 6);

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
        {/* Left: Fixed Poster */}
        <Box sx={{ flex: '0 0 300px' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              border: mode === 'dark' ? '1px solid #444' : '1px solid #ccc',
            }}
          />
        </Box>

        {/* Right: Movie Details */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: mode === 'dark'
                ? 'linear-gradient(to right, #64FFDA, #FFFFFF)'
                : 'linear-gradient(to right, #0D47A1, #000000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {movie.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarIcon sx={{ color: '#FFD700', mr: 1 }} />
            <Typography variant="h6" sx={{ color: mode === 'dark' ? '#fff' : '#000' }}>
              {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
            </Typography>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 2, color: mode === 'dark' ? '#aaa' : '#444' }}>
            {movie.release_date} • {movie.runtime} mins • {movie.original_language.toUpperCase()}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{
                  backgroundColor: mode === 'dark' ? '#64FFDA' : '#0D47A1',
                  color: mode === 'dark' ? '#000' : '#fff',
                }}
              />
            ))}
          </Box>

          <Typography variant="body1" sx={{ mb: 3, textAlign: 'justify', lineHeight: 1.6 }}>
            {movie.overview}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: mode === 'dark' ? '#64FFDA' : '#0D47A1',
              },
            }}
            sx={{ mb: 2 }}
          >
            <Tab icon={<TheatersIcon />} label="Trailers" />
            <Tab icon={<PeopleIcon />} label="Cast" />
            <Tab icon={<PersonIcon />} label="Crew" />
          </Tabs>

          {/* Tab Content */}
          {activeTab === 0 && (
            <Box>
              {trailer ? (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                  style={{ borderRadius: '8px' }}
                />
              ) : (
                <Typography>No trailers available.</Typography>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Grid container spacing={2}>
              {topCast?.map((actor) => (
                <Grid item xs={6} sm={4} md={3} key={actor.id}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : '/no-avatar.png'
                      }
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                    />
                    <Typography>{actor.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {actor.character}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 2 && (
            <Box>
              {director && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6">Director</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar
                      src={
                        director.profile_path
                          ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                          : '/no-avatar.png'
                      }
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Typography>{director.name}</Typography>
                  </Box>
                </Box>
              )}
              <Typography variant="h6">Key Crew</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {credits?.crew
                  ?.filter((person) =>
                    ['Producer', 'Screenplay', 'Director of Photography'].includes(person.job)
                  )
                  .slice(0, 6)
                  .map((person) => (
                    <Grid item xs={12} sm={6} key={person.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                              : '/no-avatar.png'
                          }
                          sx={{ width: 50, height: 50, mr: 2 }}
                        />
                        <Box>
                          <Typography>{person.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {person.job}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MoviePage;
