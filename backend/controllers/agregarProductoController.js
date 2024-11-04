const { obtenerInformacionProducto } = require('../api/obtenerInformacionProducto');
const { Envio, Producto, ProductoEnvio } = require('../models');

const registrarProducto = async (req, res) => {
    const { codigoBarras, cantidad, envioId } = req.body;

    console.log("==== Inicio de registrarProducto ====");
    console.log(`Datos recibidos: código de barras: ${codigoBarras}, cantidad: ${cantidad}, envío ID: ${envioId}`);

    try {
        if (!envioId) {
            console.error("Error: ID de envío no proporcionado");
            return res.status(400).json({ mensaje: 'ID de envío no proporcionado' });
        }

        console.log(`Buscando el envío con ID: ${envioId}`);
        const envio = await Envio.findByPk(envioId);

        if (!envio) {
            console.error("Error: Envío no encontrado");
            return res.status(404).json({ mensaje: 'Envío no encontrado' });
        }
        console.log("Envío encontrado:", envio.dataValues);

        console.log(`Buscando producto con código de barras: ${codigoBarras}`);
        let producto = await Producto.findOne({ where: { codigo_barras: codigoBarras } });

        if (!producto) {
            console.log("Producto no encontrado. Solicitando información desde la API...");

            try {
                const nuevaInfoProducto = await obtenerInformacionProducto(codigoBarras);
                console.log("Información obtenida desde la API:", nuevaInfoProducto);

                // Crear el producto en la base de datos
                producto = await Producto.create(nuevaInfoProducto);
                console.log("Producto creado en la base de datos:", producto.dataValues);
            } catch (apiError) {
                console.error("Error al obtener información del producto desde la API:", apiError.message);
                return res.status(500).json({ mensaje: 'Error al obtener la información del producto desde la API' });
            }
        } else {
            console.log("Producto encontrado en la base de datos:", producto.dataValues);
        }

        console.log("Creando o actualizando la relación en ProductoEnvio...");
        const [productoEnvio, created] = await ProductoEnvio.findOrCreate({
            where: { envioId, productoId: producto.id },
            defaults: { cantidad },
        });

        if (!created) {
            productoEnvio.cantidad += cantidad;
            await productoEnvio.save();
            console.log("Cantidad actualizada:", productoEnvio.dataValues);
        } else {
            console.log("Nueva relación creada:", productoEnvio.dataValues);
        }

        res.status(201).json({ mensaje: 'Producto agregado al envío', producto });
        console.log("==== Fin de registrarProducto ====");
    } catch (error) {
        console.error('Error al agregar producto al envío:', error.message);
        res.status(500).json({ mensaje: 'Error al agregar producto al envío' });
    }
};

module.exports = {
    registrarProducto,
};
