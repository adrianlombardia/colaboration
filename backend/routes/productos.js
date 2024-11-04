const express = require('express');
const { registrarProducto } = require('../controllers/agregarProductoController');

const router = express.Router();

// Ruta para registrar un producto
router.post('/registrar', registrarProducto);

module.exports = router;
