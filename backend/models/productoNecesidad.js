const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ProductoNecesidad extends Model { }

    ProductoNecesidad.init(
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            prioridad: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['Necesidad', 'Mucha necesidad', 'Urgencia']],
                },
            },
            almacenId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Almacenes',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'ProductoNecesidad',
            tableName: 'ProductosNecesidad',
        }
    );

    return ProductoNecesidad;
};
