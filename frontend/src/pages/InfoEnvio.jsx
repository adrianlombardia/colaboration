import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InfoEnvio = () => {
    const [productos, setProductos] = useState([]);
    const [envio, setEnvio] = useState(null);
    const [almacenes, setAlmacenes] = useState([]);
    const [almacenSeleccionado, setAlmacenSeleccionado] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { id } = useParams();

    useEffect(() => {
        // Obtener los datos del envío por ID
        axios.get(`http://localhost:5000/api/envios/${id}`)
            .then((response) => {
                setEnvio(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener el envío:', error);
            });

        // Obtener los productos relacionados con el envío
        axios.get(`http://localhost:5000/api/envios/${id}/productos`)
            .then((response) => {
                const productosRecibidos = response.data.productos || [];
                setProductos(Array.isArray(productosRecibidos) ? productosRecibidos : []);
            })
            .catch((error) => {
                console.error('Error al obtener los productos del envío:', error);
            });

        // Obtener la lista de almacenes
        axios.get('http://localhost:5000/api/almacenes')
            .then((response) => {
                setAlmacenes(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los almacenes:', error);
            });
    }, [id]);

    const manejarSeleccionAlmacen = (almacenId) => {
        const almacen = almacenes.find(a => a.id === parseInt(almacenId));
        setAlmacenSeleccionado(almacen);
    };

    // Obtener categorías únicas
    const categoriasUnicas = productos.map(p => p.categoria).filter((v, i, a) => a.indexOf(v) === i && v);

    // Filtrar productos por categoría seleccionada
    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(p => p.categoria === categoriaSeleccionada)
        : productos;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {envio ? (
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold mb-4">Información del Envío</h2>
                    <p><strong>Envío:</strong> {envio.envio}</p>
                    <p><strong>Almacén Origen:</strong> {almacenSeleccionado ? almacenSeleccionado.nombre : envio.almacen}</p>
                    <p><strong>Dirección:</strong> {almacenSeleccionado ? almacenSeleccionado.direccion : 'N/A'}</p>
                    <p><strong>Ciudad:</strong> {almacenSeleccionado ? almacenSeleccionado.ciudad : 'N/A'}</p>
                    <p><strong>Código Postal:</strong> {almacenSeleccionado ? almacenSeleccionado.codigo_postal : 'N/A'}</p>
                    <p><strong>Persona de Contacto (Envío):</strong> {almacenSeleccionado ? almacenSeleccionado.email_contacto : envio.persona_contacto_envio}</p>
                    <p><strong>Persona de Contacto (Recepción):</strong> {envio.persona_contacto_recepcion}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(envio.fecha_creado).toLocaleDateString()}</p>
                    <p><strong>Fecha de Entrega Aproximada:</strong> {new Date(envio.fecha_entrega_aproximada).toLocaleDateString()}</p>
                </div>
            ) : (
                <p className="text-red-700 text-center font-semibold">Cargando información del envío...</p>
            )}

            {/* Select para elegir el almacén */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <label htmlFor="almacenSelect" className="block text-gray-700 font-medium mb-2">Seleccionar Almacén</label>
                <select
                    id="almacenSelect"
                    onChange={(e) => manejarSeleccionAlmacen(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Seleccione un almacén</option>
                    {almacenes.map((almacen) => (
                        <option key={almacen.id} value={almacen.id}>{almacen.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Resumen de Productos por Categoría</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={() => setCategoriaSeleccionada('')}
                        className={`px-3 py-1 rounded-full ${categoriaSeleccionada === '' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    >
                        Ver Todos
                    </button>
                    {categoriasUnicas.map((categoria, index) => (
                        <button
                            key={index}
                            onClick={() => setCategoriaSeleccionada(categoria)}
                            className={`px-3 py-1 rounded-full ${categoriaSeleccionada === categoria ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                        >
                            {categoria} ({productos.filter(p => p.categoria === categoria).length})
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Listado de Productos</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-2 text-left">Código de Barras</th>
                            <th className="border-b p-2 text-left">Nombre</th>
                            <th className="border-b p-2 text-left">Cantidad Total</th>
                            <th className="border-b p-2 text-left">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(productosFiltrados) && productosFiltrados.map((producto, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border-b p-2">{producto.codigo_barras}</td>
                                <td className="border-b p-2">{producto.nombre}</td>
                                <td className="border-b p-2">{producto.cantidadTotal}</td>
                                <td className="border-b p-2">
                                    <button
                                        onClick={() => alert(`Nutrición: ${producto.nutricion || 'No disponible'}\nDescripción: ${producto.descripcion}`)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        +
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfoEnvio;
