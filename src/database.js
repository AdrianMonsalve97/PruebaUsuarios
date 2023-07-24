const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pruebauser', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;