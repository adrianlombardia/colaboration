const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Envio extends Model { }

    Envio.init(
        {
            envio: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            almacen: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha_comienzo_recoleccion: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            fecha_entrega_aproximada: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            almacen_destino: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            direccion_destino: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ciudad_destino: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            codigo_postal_destino: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pais_destino: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            telefono_destino: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email_contacto_destino: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },
            persona_contacto_envio: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            persona_contacto_recepcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Envio',
            tableName: 'Envios',
        }
    );

    return Envio;
};