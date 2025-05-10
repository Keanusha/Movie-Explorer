import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from './components/Favorites';
import Login from './pages/Login';
import { MovieProvider } from './context/MovieContext';
import { useMemo, useState } from 'react';
import { getDesignTokens } from './theme';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <MovieProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login mode={mode} />} />
            <Route path="/home" element={<Home setMode={setMode} mode={mode} />} />
           <Route path="/movie/:id" element={<MoviePage mode={mode} />} />
            <Route path="/favorites" element={<Favorites setMode={setMode} mode={mode} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MovieProvider>
  );
}

export default App;
