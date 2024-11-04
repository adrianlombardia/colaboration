import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/MenuInferior.css'; // Archivo CSS para estilos adicionales

const MenuInferior = () => {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2">
            <Link to="/" className="flex flex-col items-center">
                <div className={`p-2 rounded ${location.pathname === '/' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span className="text-2xl">🏠</span>
                    <p className="text-sm mt-1">Inicio</p>
                </div>
            </Link>
            <Link to="/verNecesidadesAlmacenes" className="flex flex-col items-center">
                <div className={`p-2 rounded ${location.pathname === '/verNecesidadesAlmacenes' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span className="text-2xl">🏬</span>
                    <p className="text-sm mt-1">Ver Necesidades</p>
                </div>
            </Link>
            <Link to="/escanear" className="flex flex-col items-center">
                <div className={`p-2 rounded ${location.pathname === '/escanear' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span className="text-2xl">📷</span>
                    <p className="text-sm mt-1">Escanear</p>
                </div>
            </Link>
            <Link to="/nuevoEnvio" className="flex flex-col items-center">
                <div className={`p-2 rounded ${location.pathname === '/nuevoEnvio' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span className="text-2xl">🚚</span>
                    <p className="text-sm mt-1">Ver Envíos</p>
                </div>
            </Link>
        </nav>
    );
};

export default MenuInferior;
