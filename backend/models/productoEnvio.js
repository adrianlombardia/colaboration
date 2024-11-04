// Definición de ProductoEnvio
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ProductoEnvio extends Model { }

    ProductoEnvio.init(
        {
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            envioId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Envios', // Nombre de la tabla de referencia
                    key: 'id',
                },
                allowNull: false,
            },
            productoId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Productos', // Nombre de la tabla de referencia
                    key: 'id',
                },
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'ProductoEnvio',
            tableName: 'ProductosEnvios',
        }
    );

    return ProductoEnvio;
};
