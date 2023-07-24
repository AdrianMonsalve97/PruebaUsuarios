// app.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios'; 

import SearchUser from './components/SearhUser/SearchUser';
import { Container } from '@mui/material';
import UserProfile from './components/UserProfile/UserProfile';
import UserFollowersChart from './components/UserFollowersChart/UserFollowersChart';

const App = () => {
  
  // Función para guardar un usuario en la base de datos
  const saveUser = async (username, followers) => {
    try {
      await axios.post('/api/users', { username, followers });
      alert('Usuario guardado con éxito.');
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      alert('Error al guardar el usuario.');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchUser saveUser={saveUser} />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/followers-chart" element={<UserFollowersChart />} />
      </Routes>
    </Router>
  );
};

export default App;
