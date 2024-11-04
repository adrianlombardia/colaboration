import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerAlmacenes = () => {
    const [almacenes, setAlmacenes] = useState([]);
    const [nuevoAlmacen, setNuevoAlmacen] = useState({ nombre: '', direccion: '', ciudad: '', codigo_postal: '', pais: '', telefono: '', email_contacto: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de almacenes y sus productos prioritarios
        axios.get('http://localhost:5000/api/almacenes')
            .then(async (response) => {
                const almacenesConProductos = await Promise.all(response.data.map(async (almacen) => {
                    const productosPrioritarios = await axios.get(`http://localhost:5000/api/productosNecesidad/${almacen.id}/productos`)
                        .then((res) => {
                            // Filtrar productos con las prioridades más altas
                            return res.data.filter(producto => producto.prioridad === 'Urgencia' || producto.prioridad === 'Mucha necesidad');
                        })
                        .catch((error) => {
                            console.error(`Error al obtener productos para el almacén ${almacen.id}:`, error);
                            return [];
                        });
                    return { ...almacen, productosPrioritarios };
                }));
                setAlmacenes(almacenesConProductos);
            })
            .catch((error) => {
                console.error('Error al obtener los almacenes:', error);
            });
    }, []);

    const verDetallesAlmacen = (almacenId) => {
        navigate(`/detallesAlmacen/${almacenId}`);
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoAlmacen({ ...nuevoAlmacen, [name]: value });
    };

    const agregarAlmacen = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/almacenes', nuevoAlmacen)
            .then((response) => {
                setAlmacenes([...almacenes, response.data]);
                setNuevoAlmacen({ nombre: '', direccion: '', ciudad: '', codigo_postal: '', pais: '', telefono: '', email_contacto: '' });
                alert('Almacén agregado con éxito');
            })
            .catch((error) => {
                console.error('Error al agregar el almacén:', error);
            });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Almacenes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {almacenes.map((almacen) => (
                    <div key={almacen.id} className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all" onClick={() => verDetallesAlmacen(almacen.id)}>
                        <h2 className="text-xl font-semibold mb-2">{almacen.nombre}</h2>
                        <p><strong>Ubicación:</strong> {almacen.direccion}, {almacen.ciudad}</p>
                        <div className="mt-4">
                            <h3 className="font-bold text-gray-700">Productos Prioritarios:</h3>
                            {almacen.productosPrioritarios.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {almacen.productosPrioritarios.slice(0, 3).map((producto, index) => (
                                        <li key={index} className={`text-sm ${producto.prioridad === 'Urgencia' ? 'text-red-500' : 'text-yellow-500'}`}>
                                            {producto.nombre} - {producto.prioridad}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No hay productos prioritarios</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulario para agregar un nuevo almacén */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Almacén</h2>
                <form onSubmit={agregarAlmacen} className="mb-4">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del almacén"
                        value={nuevoAlmacen.nombre}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        value={nuevoAlmacen.direccion}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="ciudad"
                        placeholder="Ciudad"
                        value={nuevoAlmacen.ciudad}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="codigo_postal"
                        placeholder="Código Postal"
                        value={nuevoAlmacen.codigo_postal}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="pais"
                        placeholder="País"
                        value={nuevoAlmacen.pais}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="telefono"
                        placeholder="Teléfono"
                        value={nuevoAlmacen.telefono}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email_contacto"
                        placeholder="Email de contacto"
                        value={nuevoAlmacen.email_contacto}
                        onChange={manejarCambio}
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all"
                    >
                        Agregar Almacén
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerAlmacenes;
