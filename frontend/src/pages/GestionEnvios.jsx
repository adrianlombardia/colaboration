import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MenuInferior from '../components/MenuInferior';
import { EnvioContext } from '../context/EnvioContext';
import { Link } from 'react-router-dom';

const GestionEnvios = () => {
    const [envios, setEnvios] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [formData, setFormData] = useState({
        envio: '',
        almacen: '',
        fecha_comienzo_recoleccion: '',
        fecha_entrega_aproximada: '',
        almacen_destino: '',
        direccion: '',
        ciudad: '',
        codigo_postal: '',
        pais: '',
        telefono: '',
        persona_contacto_envio: '',
        persona_contacto_recepcion: '',
        email_contacto: '',
    });
    const { envioSeleccionado, setEnvioSeleccionado } = useContext(EnvioContext);

    useEffect(() => {
        cargarEnvios();
        cargarAlmacenes();
    }, []);

    const cargarEnvios = () => {
        axios.get('http://localhost:5000/api/envios')
            .then((response) => {
                setEnvios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los envíos:', error);
            });
    };

    const cargarAlmacenes = () => {
        axios.get('http://localhost:5000/api/almacenes')
            .then((response) => {
                setAlmacenes(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los almacenes:', error);
            });
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const manejarSeleccionAlmacenDestino = (e) => {
        const almacenId = e.target.value;
        const almacenSeleccionado = almacenes.find(a => a.id === parseInt(almacenId));

        if (almacenSeleccionado) {
            setFormData({
                ...formData,
                almacen_destino: almacenId,
                direccion: almacenSeleccionado.direccion,
                ciudad: almacenSeleccionado.ciudad,
                codigo_postal: almacenSeleccionado.codigo_postal,
                pais: almacenSeleccionado.pais,
                telefono: almacenSeleccionado.telefono,
                persona_contacto_recepcion: almacenSeleccionado.telefono,
                email_contacto: almacenSeleccionado.email_contacto || '',
            });
        }
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/envios', formData)
            .then(() => {
                alert('Envío creado con éxito');
                setFormData({
                    envio: '',
                    almacen: '',
                    fecha_comienzo_recoleccion: '',
                    fecha_entrega_aproximada: '',
                    almacen_destino: '',
                    direccion: '',
                    ciudad: '',
                    codigo_postal: '',
                    pais: '',
                    telefono: '',
                    persona_contacto_envio: '',
                    persona_contacto_recepcion: '',
                    email_contacto: '',
                });
                cargarEnvios();
            })
            .catch((error) => {
                console.error('Error al crear el envío:', error);
                alert('Error al crear el envío');
            });
    };

    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const enviosFiltrados = envios.filter(envio =>
        Object.values(envio).some(valor =>
            valor.toString().toLowerCase().includes(busqueda.toLowerCase())
        )
    );

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestionar Envíos</h1>

                <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Crear Nuevo Envío</h2>
                    <form onSubmit={manejarEnvio} className="grid gap-4">
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="envio" placeholder="Nombre del Envío" value={formData.envio} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="persona_contacto_envio" placeholder="Telefono Contacto Envío" value={formData.persona_contacto_envio} onChange={manejarCambio} required />

                        <select className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="almacen_destino" onChange={manejarSeleccionAlmacenDestino} required>
                            <option value="">Seleccione un almacén de destino</option>
                            {almacenes.map(almacen => (
                                <option key={almacen.id} value={almacen.id}>{almacen.nombre}</option>
                            ))}
                        </select>

                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" name="fecha_comienzo_recoleccion" value={formData.fecha_comienzo_recoleccion} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" name="fecha_entrega_aproximada" value={formData.fecha_entrega_aproximada} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="codigo_postal" placeholder="Código Postal" value={formData.codigo_postal} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="pais" placeholder="País" value={formData.pais} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={manejarCambio} required />
                        <input className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" name="email_contacto" placeholder="Email de Contacto" value={formData.email_contacto} onChange={manejarCambio} required />
                        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all">Crear Envío</button>
                    </form>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Lista de Envíos</h2>
                    <input
                        type="text"
                        placeholder="Buscar envíos..."
                        value={busqueda}
                        onChange={manejarBusqueda}
                        className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ul className="space-y-4">
                        {enviosFiltrados.map((envio) => (
                            <li
                                key={envio.id}
                                className={`flex justify-between items-center bg-gray-100 p-4 rounded shadow-sm hover:bg-gray-200 transition-all ${envioSeleccionado?.id === envio.id ? 'border-2 border-blue-500' : ''}`}
                            >
                                <div>
                                    <p className="text-gray-800"><strong>Envio ID:</strong> {envio.id}</p>
                                    <p className="text-gray-600"><strong>Almacén:</strong> {envio.almacen}</p>
                                    <p className="text-gray-600"><strong>Fecha de Recolección:</strong> {new Date(envio.fecha_comienzo_recoleccion).toLocaleDateString()}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link to={`/infoEnvio/${envio.id}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all">
                                        Ver
                                    </Link>
                                    <button
                                        onClick={() => setEnvioSeleccionado(envio)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
                                    >
                                        Seleccionar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <MenuInferior />
        </div>
    );
};

export default GestionEnvios;
