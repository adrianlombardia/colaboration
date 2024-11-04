const { Almacen } = require('../models');

// Obtener todos los almacenes
const obtenerAlmacenes = async (req, res) => {
    try {
        const almacenes = await Almacen.findAll();
        res.status(200).json(almacenes);
    } catch (error) {
        console.error('Error al obtener los almacenes:', error);
        res.status(500).json({ mensaje: 'Error al obtener los almacenes' });
    }
};
// Crear un nuevo almacén
const crearAlmacen = async (req, res) => {
    try {
        const { nombre, direccion, ciudad, codigo_postal, pais, telefono, email_contacto } = req.body;

        // Validar si todos los campos obligatorios están presentes
        if (!nombre || !direccion || !ciudad || !codigo_postal || !pais) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
        }

        const nuevoAlmacen = await Almacen.create({ nombre, direccion, ciudad, codigo_postal, pais, telefono, email_contacto });
        res.status(201).json(nuevoAlmacen);
    } catch (error) {
        console.error('Error al crear el almacén:', error);
        res.status(500).json({ mensaje: 'Error al crear el almacén' });
    }
};
// Obtener un almacén por ID
const obtenerAlmacenPorId = async (req, res) => {
    try {
        const almacen = await Almacen.findByPk(req.params.id);
        if (!almacen) {
            return res.status(404).json({ mensaje: 'Almacén no encontrado' });
        }
        res.status(200).json(almacen);
    } catch (error) {
        console.error('Error al obtener el almacén:', error);
        res.status(500).json({ mensaje: 'Error al obtener el almacén' });
    }
};

module.exports = {
    obtenerAlmacenes,
    crearAlmacen,
    obtenerAlmacenPorId
};
