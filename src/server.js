const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agrega esta línea
const sequelize = require('./database');
const User = require('./models/Users');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use(cors());

// Endpoint para guardar un usuario
app.post('/api/users', async (req, res) => {
  try {
    const { username, followers } = req.body;
    const newUser = await User.create({ username, followers });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});

// Endpoint para consultar el listado de usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Sincronizar la base de datos y poner el servidor en funcionamiento
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
