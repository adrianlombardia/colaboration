const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Producto extends Model { }

    Producto.init(
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            codigo_barras: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            precio: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            manufacturer: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ingredientes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            nutricion: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            imagenes: {
                type: DataTypes.TEXT, // Almacena las URLs de imágenes como un JSON string
                allowNull: true,
            },

        },
        {
            sequelize,
            modelName: 'Producto',
            tableName: 'Productos',
        }
    );

    return Producto;
};
