const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const enviosRoutes = require('./routes/envios');
const productosRoutes = require('./routes/productos');
const almacenesRoutes = require('./routes/almacenes'); // Importar rutas de almacenes
const productoNecesidadRoutes = require('./routes/productoNecesidad');


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api/envios', enviosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/almacenes', almacenesRoutes); // Rutas para almacenes
app.use('/api/productosNecesidad', productoNecesidadRoutes);
// Sincronizar la base de datos y lanzar el servidor
db.syncDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
