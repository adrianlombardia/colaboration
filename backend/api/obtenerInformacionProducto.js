const axios = require('axios');

const obtenerInformacionProducto = async (codigoBarras) => {
    try {
        const apiKey = '64uzngtin8dr6frdk5nxgnzn4d7088';
        const response = await axios.get(`https://api.barcodelookup.com/v3/products?barcode=${codigoBarras}&key=${apiKey}`);

        if (response.data.products.length === 0) {
            throw new Error('Producto no encontrado en la API');
        }

        const producto = response.data.products[0];

        // Log para mostrar la información completa del producto
        console.log('Información completa del producto desde la API:', producto);

        return {
            nombre: producto.title || 'Nombre no disponible',
            descripcion: producto.description,
            codigo_barras: producto.barcode_number,
            precio: parseFloat(producto.price) || null, // Convertir a tipo FLOAT si es posible
            manufacturer: producto.manufacturer || null,
            brand: producto.brand || null,
            categoria: producto.category || null,
            ingredientes: producto.ingredients || null,
            nutricion: producto.nutrition_facts || null,
            imagenes: JSON.stringify(producto.images || []) // Convertir el array a un string JSON
        };
    } catch (error) {
        console.error('Error al obtener información del producto:', error);
        throw error;
    }
};


module.exports = {
    obtenerInformacionProducto,
};
