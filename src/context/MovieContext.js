import { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [lastSearch, setLastSearch] = useState(localStorage.getItem('lastSearch') || '');

  const addFavorite = (movie) => {
    const updated = [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};
