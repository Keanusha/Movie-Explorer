import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, List, ListItem, ListItemButton } from '@mui/material';

function SearchBar({ onSearch, mode }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  const tealBlue = {
    primary: '#0A192F',
    secondary: '#172A45',
    accent: '#64FFDA',
    text: '#CCD6F6'
  };

  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (input.trim()) {
      const filtered = history.filter(item =>
        item.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [input, history]);

  const handleSearch = (term = input) => {
    if (term.trim()) {
      onSearch(term);
      const updatedHistory = [term, ...history.filter(h => h !== term)];
      setHistory(updatedHistory.slice(0, 10));
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory.slice(0, 10)));
      setInput('');
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (value) => {
    handleSearch(value);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 800, mx: 'auto', mt: 4, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <TextField
          fullWidth
          label="Search for a movie..."
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#fff',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: tealBlue.accent,
              },
              '&:hover fieldset': {
                borderColor: tealBlue.accent,
              },
            },
            '& .MuiInputLabel-root': {
              color: mode === 'dark' ? tealBlue.text : tealBlue.primary,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => handleSearch()}
          sx={{
            px: 4,
            py: 1.5,
            backgroundColor: tealBlue.secondary,
            color: tealBlue.text,
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: tealBlue.primary,
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 8px rgba(0,0,0,0.2)`
            },
            transition: 'all 0.3s ease'
          }}
        >
          Search
        </Button>
      </Box>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            maxHeight: 200,
            overflowY: 'auto',
            mt: 1,
            backgroundColor: mode === 'dark' ? tealBlue.primary : '#fff',
            border: `1px solid ${tealBlue.accent}`
          }}
        >
          <List dense>
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default SearchBar;
