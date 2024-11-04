const express = require('express');
const router = express.Router();
const {
    obtenerProductosNecesidad,
    obtenerProductosPorAlmacen,
    crearProductoNecesidad,
    eliminarProductoNecesidad,
} = require('../controllers/productoNecesidadController');

// Ruta para obtener todos los productos de necesidad
router.get('/', obtenerProductosNecesidad);

// Ruta para obtener productos de necesidad por ID de almacén
router.get('/:almacenId/productos', obtenerProductosPorAlmacen);

// Ruta para crear un producto de necesidad
router.post('/:almacenId/productos', crearProductoNecesidad);

// Ruta para eliminar un producto de necesidad por ID
router.delete('/:almacenId/productos/:productoId', eliminarProductoNecesidad);

module.exports = router;
