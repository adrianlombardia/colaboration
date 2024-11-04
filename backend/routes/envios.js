const express = require('express');
const {
    crearEnvio,
    obtenerEnvios,
    obtenerEnvioPorId,
    obtenerEnvioConProductos,
    actualizarEnvio,
    eliminarEnvio,
} = require('../controllers/enviosController');

const router = express.Router();

router.post('/', crearEnvio);
router.get('/', obtenerEnvios);
router.get('/:id', obtenerEnvioPorId);
router.get('/:id/productos', obtenerEnvioConProductos); // Ruta para obtener envío con productos
router.put('/:id', actualizarEnvio);
router.delete('/:id', eliminarEnvio);

module.exports = router;
