const { ProductoNecesidad, Almacen } = require('../models');

// Obtener todos los productos de necesidad
const obtenerProductosNecesidad = async (req, res) => {
    try {
        const productos = await ProductoNecesidad.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener productos de necesidad:', error);
        res.status(500).json({ mensaje: 'Error al obtener los productos de necesidad' });
    }
};

// Obtener productos de necesidad por ID de almacén
const obtenerProductosPorAlmacen = async (req, res) => {
    try {
        const { almacenId } = req.params;
        const productos = await ProductoNecesidad.findAll({ where: { almacenId } });
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener productos de necesidad por almacén:', error);
        res.status(500).json({ mensaje: 'Error al obtener productos por almacén' });
    }
};

// Crear un producto de necesidad
const crearProductoNecesidad = async (req, res) => {
    const { almacenId } = req.params;
    const { nombre, categoria, cantidad, prioridad } = req.body;

    try {
        console.log('ID del almacén recibido:', almacenId);
        console.log('Datos del producto recibidos:', { nombre, categoria, cantidad, prioridad });

        const almacen = await Almacen.findByPk(almacenId);
        if (!almacen) {
            console.log('Almacén no encontrado');
            return res.status(404).json({ mensaje: 'Almacén no encontrado' });
        }

        console.log('Almacén encontrado:', almacen);

        const nuevoProducto = await ProductoNecesidad.create({
            nombre,
            categoria,
            cantidad,
            prioridad,
            almacenId: almacen.id
        });

        console.log('Producto de necesidad creado:', nuevoProducto);

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear el producto de necesidad:', error);
        res.status(500).json({ mensaje: 'Error al crear el producto de necesidad' });
    }
};


// Eliminar un producto de necesidad
const eliminarProductoNecesidad = async (req, res) => {
    const { almacenId, productoId } = req.params;
    try {
        const producto = await ProductoNecesidad.findOne({
            where: { id: productoId, almacenId }
        });
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.status(200).json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto de necesidad:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto de necesidad' });
    }
};

module.exports = {
    obtenerProductosNecesidad,
    obtenerProductosPorAlmacen,
    crearProductoNecesidad,
    eliminarProductoNecesidad,
};
