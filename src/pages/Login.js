import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login({ mode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      navigate('/home');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(/bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(10, 25, 47, 0.7)', 
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          position: 'relative',
          zIndex: 1,
          p: 4,
          width: 350,
          backgroundColor: 'rgba(10, 25, 47, 0.85)', 
          color: '#ffffff',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 600,
            fontFamily: 'Poppins, sans-serif',
            color: '#64FFDA', 
          }}
        >
          Login to Movie Explorer
        </Typography>

        <TextField
          fullWidth
          variant="filled"
          label="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            mb: 2,
            input: { color: 'white' },
            label: { color: '#bbb' },
            backgroundColor: '#112240',
          }}
        />

        <TextField
          fullWidth
          variant="filled"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            input: { color: 'white' },
            label: { color: '#bbb' },
            backgroundColor: '#112240',
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: '#64FFDA',
            color: '#0A192F',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#52e0c4',
            },
          }}
        >
        Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
