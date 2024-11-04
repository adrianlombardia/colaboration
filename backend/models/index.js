const sequelize = require('../config/database');

const db = {};

// Importar modelos
db.Almacen = require('./almacen')(sequelize);
db.Envio = require('./envio')(sequelize);
db.Producto = require('./producto')(sequelize);
db.ProductoEnvio = require('./productoEnvio')(sequelize);
db.ProductoNecesidad = require('./productoNecesidad')(sequelize);

// Asociaciones entre modelos
db.Envio.hasMany(db.ProductoEnvio, { foreignKey: 'envioId' });
db.Producto.hasMany(db.ProductoEnvio, { foreignKey: 'productoId' });
db.ProductoEnvio.belongsTo(db.Envio, { foreignKey: 'envioId' });
db.ProductoEnvio.belongsTo(db.Producto, { foreignKey: 'productoId' });

// Asociaciones de muchos a muchos entre Producto y Envio a través de ProductoEnvio
db.Envio.belongsToMany(db.Producto, {
  through: db.ProductoEnvio,
  as: 'productos',
  foreignKey: 'envioId',
});

db.Producto.belongsToMany(db.Envio, {
  through: db.ProductoEnvio,
  as: 'envios',
  foreignKey: 'productoId',
});


// Función para sincronizar la base de datos
async function syncDatabase() {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: false }); // force: true solo en desarrollo o si quieres recrear la BD
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Database connected and synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
    throw error;
  }
}

module.exports = {
  ...db,
  sequelize,
  syncDatabase,
};
