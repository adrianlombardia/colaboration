const express = require('express');
const router = express.Router();
const { obtenerAlmacenes, crearAlmacen, obtenerAlmacenPorId } = require('../controllers/almacenesController');

// Ruta para obtener todos los almacenes
router.get('/', obtenerAlmacenes);
// Ruta para obtener un almacén por ID
router.get('/:id', obtenerAlmacenPorId);
// Ruta para crear un nuevo almacén
router.post('/', crearAlmacen);

module.exports = router;
