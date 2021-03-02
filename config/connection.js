const Sequelize = require ('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('sequelize_library', 'root', '', {
    host: 'localhost',
    port: 3306,
    password: 'Kris10Gr0ller',
    dialect: 'mysql',
});

module.exports = sequelize;
