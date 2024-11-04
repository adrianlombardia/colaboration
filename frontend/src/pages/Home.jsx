import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css'; // Archivo CSS para estilos
import MenuInferior from '../components/MenuInferior';

const Home = () => {
    const [almacenesConUrgentes, setAlmacenesConUrgentes] = useState([]);

    useEffect(() => {
        // Obtener almacenes y sus productos urgentes
        axios.get('http://localhost:5000/api/almacenes')
            .then(async (response) => {
                const almacenesConProductosUrgentes = await Promise.all(response.data.map(async (almacen) => {
                    const productosUrgentes = await axios.get(`http://localhost:5000/api/productosNecesidad/${almacen.id}/productos`)
                        .then((res) => {
                            return res.data.filter(producto => producto.prioridad === 'Urgencia');
                        })
                        .catch((error) => {
                            console.error(`Error al obtener productos urgentes para el almacén ${almacen.id}:`, error);
                            return [];
                        });
                    return { ...almacen, productosUrgentes };
                }));
                setAlmacenesConUrgentes(almacenesConProductosUrgentes);
            })
            .catch((error) => {
                console.error('Error al obtener los almacenes:', error);
            });
    }, []);

    return (
        <>
            <div className="home-container">
                <h1>Página Principal</h1>
                <div className="card-grid">
                    <Link to="/verNecesidadesAlmacenes" className="card">
                        <h2>📦 Ver Productos Necesarios</h2>
                        <p>Consulta la lista de productos requeridos.</p>
                    </Link>
                    <Link to="/nuevoEnvio" className="card">
                        <h2>🚚 Ver Envíos</h2>
                        <p>Revisa los envíos y su estado.</p>
                    </Link>
                    <Link to="/escanear" className="card">
                        <h2>📷 Escanear Productos</h2>
                        <p>Escanea productos y regístralos automáticamente.</p>
                    </Link>
                </div>

                {/* Listado de productos urgentes por almacén */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Productos Urgentes por Almacén</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {almacenesConUrgentes.map((almacen) => (
                            <div key={almacen.id} className="p-4 border rounded shadow-md bg-white">
                                <h3 className="text-lg font-bold mb-2">{almacen.nombre}</h3>
                                {almacen.productosUrgentes.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {almacen.productosUrgentes.map((producto, index) => (
                                            <li key={index} className="text-red-500 text-left">
                                                {producto.nombre} - Urgencia
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No hay productos urgentes.</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <MenuInferior />
        </>
    );
};

export default Home;
