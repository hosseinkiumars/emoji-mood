// src/App.js (React Frontend)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, TextField, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const emojis = ['😀', '😐', '😔', '😎', '😡', '😇', '🤔'];

const App = () => {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [currentEmoji, setCurrentEmoji] = useState('🙂');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://127.0.0.1:5000/users');
    setUsers(response.data);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { name, password });
      setCurrentEmoji(response.data.emoji);
      setLoggedIn(true);
    } catch {
      alert('Login failed');
    }
  };

  const handleEmojiSubmit = async () => {
    await axios.post('http://127.0.0.1:5000/update_emoji', { name, emoji: currentEmoji });
    fetchUsers();  // Update the emoji list after submission
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Emoji Mood Tracker</Typography>
      
      {!loggedIn ? (
        <>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
          <Button variant="contained" onClick={handleLogin}>Login</Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Select your emoji:</Typography>
          <List>
            {emojis.map(emoji => (
              <ListItem key={emoji} button onClick={() => setCurrentEmoji(emoji)}>
                <ListItemText primary={emoji} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" onClick={handleEmojiSubmit}>Submit Emoji</Button>
        </>
      )}

      <Typography variant="h6" gutterBottom>Users and their current mood:</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user.name}>
            <ListItemText primary={`${user.name}: ${user.emoji}`} />
            <IconButton><EmojiEmotionsIcon /></IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
