import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetallesAlmacen = () => {
    const { id } = useParams();
    const [productos, setProductos] = useState([]);
    const [almacen, setAlmacen] = useState(null);
    const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', categoria: '', cantidad: 1, prioridad: 'Necesidad' });
    const [filtroPrioridad, setFiltroPrioridad] = useState('');

    useEffect(() => {
        // Obtener detalles del almacén
        axios.get(`http://localhost:5000/api/almacenes/${id}`)
            .then((response) => {
                setAlmacen(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los detalles del almacén:', error);
            });

        // Obtener productos necesarios del almacén
        axios.get(`http://localhost:5000/api/productosNecesidad/${id}/productos`)
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los productos del almacén:', error);
            });
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const agregarProducto = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/productosNecesidad/${id}/productos`, nuevoProducto)
            .then((response) => {
                setProductos([...productos, response.data]);
                setNuevoProducto({ nombre: '', categoria: '', cantidad: 1, prioridad: 'Necesidad' });
                alert('Producto agregado con éxito');
            })
            .catch((error) => {
                console.error('Error al agregar el producto:', error);
            });
    };

    const eliminarProducto = (productoId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            axios.delete(`http://localhost:5000/api/productosNecesidad/${id}/productos/${productoId}`)
                .then(() => {
                    setProductos(productos.filter(producto => producto.id !== productoId));
                    alert('Producto eliminado con éxito');
                })
                .catch((error) => {
                    console.error('Error al eliminar el producto:', error);
                    alert('Error al eliminar el producto');
                });
        }
    };

    const productosFiltrados = filtroPrioridad
        ? productos.filter(producto => producto.prioridad === filtroPrioridad)
        : productos.sort((a, b) => {
            const prioridades = { 'Urgencia': 1, 'Mucha necesidad': 2, 'Necesidad': 3 };
            return prioridades[a.prioridad] - prioridades[b.prioridad];
        });

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {almacen ? (
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold mb-4">Detalles del Almacén: {almacen.nombre}</h2>
                    <p><strong>Dirección:</strong> {almacen.direccion}</p>
                    <p><strong>Ciudad:</strong> {almacen.ciudad}</p>
                    <p><strong>Código Postal:</strong> {almacen.codigo_postal}</p>
                    <p><strong>País:</strong> {almacen.pais}</p>
                    <p><strong>Teléfono:</strong> {almacen.telefono}</p>
                    <p><strong>Email de Contacto:</strong> {almacen.email_contacto}</p>
                </div>
            ) : (
                <p className="text-red-700 text-center font-semibold">Cargando detalles del almacén...</p>
            )}

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Agregar Producto Necesario</h2>
                <form onSubmit={agregarProducto} className="mb-4">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del producto"
                        value={nuevoProducto.nombre}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="categoria" className="block text-gray-700 font-bold mb-2">Seleccionar Categoría:</label>
                    <select
                        id="categoria"
                        name="categoria"
                        value={nuevoProducto.categoria}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="alimentos_basicos">🥫 Alimentos Básicos</option>
                        <option value="agua_y_bebidas">💧 Agua y Bebidas</option>
                        <option value="medicamentos_basicos">💊 Medicamentos Básicos</option>
                        <option value="suministros_medicos">🩺 Suministros Médicos</option>
                        <option value="equipo_de_proteccion">🛡️ Equipo de Protección Personal</option>
                        <option value="higiene_personal">🧼 Higiene Personal</option>
                        <option value="suministros_para_refugio">🏠 Suministros para Refugio</option>
                        <option value="productos_infantiles">🍼 Productos Infantiles</option>
                        <option value="productos_para_mascotas">🐾 Productos para Mascotas</option>
                        <option value="herramientas_de_emergencia">🔧 Herramientas de Emergencia</option>
                        <option value="energia_alternativa">🔋 Energía Alternativa y Baterías</option>
                        <option value="ropa_y_abrigo">🧥 Ropa y Abrigo</option>
                        <option value="comunicacion_y_electronica">📡 Comunicación y Electrónica</option>
                        <option value="materiales_de_construccion">🪚 Materiales de Construcción y Reparación</option>
                        <option value="alojamiento_temporal">⛺ Alojamiento Temporal</option>
                        <option value="kits_de_supervivencia">🆘 Kits de Supervivencia</option>
                        <option value="combustible">⛽ Combustible</option>
                        <option value="articulos_de_cocina">🍳 Artículos de Cocina Portátil</option>
                    </select>
                    <input
                        type="number"
                        name="cantidad"
                        placeholder="Cantidad"
                        value={nuevoProducto.cantidad}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                    />
                    <select
                        name="prioridad"
                        value={nuevoProducto.prioridad}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Necesidad">Necesidad</option>
                        <option value="Mucha necesidad">Mucha necesidad</option>
                        <option value="Urgencia">Urgencia</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
                    >
                        Agregar Producto
                    </button>
                </form>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Productos Necesarios</h2>
                <div className="mb-4">
                    <button
                        onClick={() => setFiltroPrioridad('')}
                        className={`mr-2 px-4 py-1 rounded ${filtroPrioridad === '' ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFiltroPrioridad('Urgencia')}
                        className={`mr-2 px-4 py-1 rounded ${filtroPrioridad === 'Urgencia' ? 'bg-red-700 text-white' : 'bg-red-500 text-white'}`}
                    >
                        Urgencia
                    </button>
                    <button
                        onClick={() => setFiltroPrioridad('Mucha necesidad')}
                        className={`mr-2 px-4 py-1 rounded ${filtroPrioridad === 'Mucha necesidad' ? 'bg-yellow-600' : 'bg-yellow-400'}`}
                    >
                        Mucha necesidad
                    </button>
                    <button
                        onClick={() => setFiltroPrioridad('Necesidad')}
                        className={`px-4 py-1 rounded ${filtroPrioridad === 'Necesidad' ? 'bg-green-500' : 'bg-green-300'}`}
                    >
                        Necesidad
                    </button>
                </div>

                <p className="mb-2 text-gray-700">
                    Estás viendo los productos con prioridad: <span className="font-bold">{filtroPrioridad || 'Todas'}</span>
                </p>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-2 text-left">Nombre</th>
                            <th className="border-b p-2 text-left">Categoría</th>
                            <th className="border-b p-2 text-left">Cantidad</th>
                            <th className="border-b p-2 text-left">Prioridad</th>
                            <th className="border-b p-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.length > 0 ? productosFiltrados.map((producto, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border-b p-2">{producto.nombre}</td>
                                <td className="border-b p-2">{producto.categoria || 'Sin categoría'}</td>
                                <td className="border-b p-2">{producto.cantidad}</td>
                                <td className={`border-b p-2 ${producto.prioridad === 'Urgencia' ? 'bg-red-500 text-white' : producto.prioridad === 'Mucha necesidad' ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {producto.prioridad}
                                </td>
                                <td className="border-b p-2">
                                    <button
                                        onClick={() => eliminarProducto(producto.id)}
                                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No hay productos necesarios en este almacén.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetallesAlmacen;
