// Archivo de modelo para Almacenes: /models/almacen.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Almacen extends Model { }

    Almacen.init(
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            direccion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ciudad: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            codigo_postal: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pais: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email_contacto: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'Almacen',
            tableName: 'Almacenes',
        }
    );

    return Almacen;
};