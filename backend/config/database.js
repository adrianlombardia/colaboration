const { Sequelize } = require('sequelize');

// Configura la instancia de Sequelize
const sequelize = new Sequelize('colaboration', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Habilita o desactiva el registro de consultas SQL
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
});

module.exports = sequelize;
