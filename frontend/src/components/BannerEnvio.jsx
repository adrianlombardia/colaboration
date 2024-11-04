import React, { useContext } from 'react';
import { EnvioContext } from '../context/EnvioContext';

const BannerEnvio = () => {
    const { envioSeleccionado } = useContext(EnvioContext);

    return (
        <div className={`p-4 mb-6 rounded-lg shadow-md ${envioSeleccionado ? 'bg-blue-100' : 'bg-red-100'}`}>
            {envioSeleccionado ? (
                <div className="text-blue-700 text-center font-semibold ">
                    <p><strong>Envío seleccionado:</strong> {envioSeleccionado.envio} (ID: {envioSeleccionado.id})<strong>Almacén Origen:</strong> {envioSeleccionado.almacen}<strong>Destino:</strong> {envioSeleccionado.almacen_destino}<strong>Persona de Contacto (Envío):</strong> {envioSeleccionado.persona_contacto_envio}<strong>Persona de Contacto (Recepción):</strong> {envioSeleccionado.persona_contacto_recepcion}<strong>Fecha de Creación:</strong> {new Date(envioSeleccionado.fecha_creado).toLocaleDateString()}<strong>Fecha de Entrega Aproximada:</strong> {new Date(envioSeleccionado.fecha_entrega_aproximada).toLocaleDateString()}</p>
                </div>
            ) : (
                <p className="text-red-700 text-center font-semibold">
                    No se ha seleccionado un envío. <a href="/nuevoEnvio" className="underline">Seleccione un envío</a>
                </p>
            )}
        </div>
    );
};

export default BannerEnvio;