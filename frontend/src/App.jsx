// src/App.js (React Frontend)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, TextField, List, ListItem, ListItemText, Typography, Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';  // To reset the CSS baseline for consistent styling



const theme = createTheme({
  palette: {
    primary: {
      main: '#E5D283',
    },
    secondary: {
      main: '#4F709C',
    },
    background: {
      main: '#F0F0F0',
    },
    text: {
      main: '#213555',
    },
  },
  typography: {
    fontFamily: '"Playwrite GB S", cursive',
  },
});


const emojis = [
  '😀', '😃', '😊', '😌', '😍', '😘', '😋', '😎', '🙂', '😏', 
  '😒', '😔', '😢', '😭', '😡', '😠', '😤', '😳', '😱', '😩', 
  '😓', '🥱', '🤔', '🥳'
];

const App = () => {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [currentEmoji, setCurrentEmoji] = useState('🙂');

  useEffect(() => {
    fetchUsers();
    const intervalId = setInterval(fetchUsers, 5000); // Polling every 5 seconds
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://mood.muses.ir/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://mood.muses.ir/api/login', { name, password });
      setCurrentEmoji(response.data.emoji);
      setLoggedIn(true);
    } catch {
      alert('Login failed');
    }
  };

  const handleEmojiSubmit = async (emoji) => {
    await axios.post('https://mood.muses.ir/api/update_emoji', { name, emoji });
    fetchUsers();  // Update the emoji list after submission
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets the CSS baseline */}

      <Box sx={{ backgroundColor: 'gray', minHeight: '100vh', padding: '8px' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px', borderRadius: '8px', backgroundColor: 'background.main' }}>
          {/* <Typography variant="h6" color='text.main' gutterBottom>😁 Emoji Mood 😀</Typography> */}
          
          {!loggedIn ? (
            <>
              <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <TextField 
                    label="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                    size='small'
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField 
                    label="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    fullWidth 
                    margin="normal" 
                    size='small'
                  />
                </Grid>
                <Grid item xs={10} sm={4} md={2}>
                  <Button 
                    bgcolor='primary.main'
                    variant="contained" 
                    onClick={handleLogin} 
                    fullWidth
                    size='small'
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="p" gutterBottom>Select your emoji:</Typography>
              {/* <List sx={{display:'flex'}}>
                {emojis.map(emoji => (
                  <ListItem key={emoji} button onClick={() => setCurrentEmoji(emoji)}>
                    <ListItemText primary={emoji} />
                  </ListItem>
                ))}
              </List> */}
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                {emojis.map((emoji) => (
                  <Grid item xs={3} sm={3} md={2} lg={1} key={emoji}> {/* Adjust the 'xs' value to control the grid width */}
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setCurrentEmoji(emoji);
                        setTimeout(() => {
                          handleEmojiSubmit(emoji); // Submit after 100ms
                        }, 100); // 100ms delay
                      }}
                    >
                      {emoji}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
        
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0px', marginTop:'8px', borderRadius: '8px', backgroundColor: 'background.main' }}>
          <Typography variant="p" >Users and their current mood:</Typography>
          {/* <List>
            {users.map(user => (
              <ListItem key={user.name}>
                <ListItemText primary={`${user.name}: ${user.emoji}`} />
              </ListItem>
            ))}
          </List> */}
          <Grid container spacing={2} alignItems="center" justifyContent="center" >
            {users.map((user) => (
              <Grid item xs={6} sm={6} md={3} lg={3} key={user.name}>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:"center", justifyContent:"center" }}>
                  <Typography color='text.main' variant='h5'>{user.name}</Typography>
                  <Typography color='text.main' variant='h1'>{user.emoji}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
