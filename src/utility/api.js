import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

export const searchMovies = (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);

export const fetchMovieDetails = (id) =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);

export const fetchMovieCredits = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
};

export const fetchMovieVideos = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
};