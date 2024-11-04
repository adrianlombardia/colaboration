import React, { useEffect, useState, useContext, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { EnvioContext } from '../context/EnvioContext';

const Escanear = () => {
    const [codigoManual, setCodigoManual] = useState('');
    const [cantidadEnvio, setCantidadEnvio] = useState(1); // Nuevo estado para la cantidad
    const { envioSeleccionado } = useContext(EnvioContext);
    const inputRef = useRef(null); // Referencia para el input

    useEffect(() => {
        // Enfocar el input cuando el componente se monta
        if (inputRef.current) {
            inputRef.current.focus();
        }

        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                fps: 15, // Incrementar el FPS puede ayudar a mantener la imagen actualizada.
                qrbox: { width: 300, height: 300 }, // Tamaño más grande puede ayudar al enfoque.
            },
            false
        );

        scanner.render(
            (decodedText) => {
                console.log('Código escaneado:', decodedText);
                registrarProducto(decodedText);
            },
            (error) => {
                console.warn('Error de escaneo:', error);
            }
        );

        return () => {
            scanner.clear();
        };
    }, []);

    const registrarProducto = (codigo) => {
        if (!envioSeleccionado) {
            alert('No hay un envío seleccionado. Por favor, selecciona un envío antes de continuar.');
            return;
        }

        axios.post('http://localhost:5000/api/productos/registrar', {
            codigoBarras: codigo,
            cantidad: cantidadEnvio, // Usar la cantidad ingresada
            envioId: envioSeleccionado.id
        })
            .then((response) => {
                alert(response.data.mensaje || 'Producto registrado con éxito');
            })
            .catch((error) => {
                console.error('Error al registrar el producto:', error);
            });
    };

    const manejarEnvioManual = (e) => {
        e.preventDefault();
        if (codigoManual.trim()) {
            registrarProducto(codigoManual.trim());
            setCodigoManual(''); // Limpiar el campo después de enviar
        } else {
            alert('Por favor, introduce un código de barras válido.');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Escanear o Introducir Productos</h1>
            <div id="reader" className="mb-4 border border-gray-300 rounded-md shadow-sm" style={{ width: '100%' }}></div>

            {/* Campo de entrada de texto para introducir código manualmente */}
            <form onSubmit={manejarEnvioManual} className="flex flex-col items-center">
                <input
                    ref={inputRef} // Asignar la referencia al input
                    type="text"
                    placeholder="Introduce el código de barras manualmente"
                    value={codigoManual}
                    onChange={(e) => setCodigoManual(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidadEnvio}
                    onChange={(e) => setCantidadEnvio(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                />
                <span>Ejemplo: 5449000133328</span>
                <button
                    type="submit"
                    className="w-full max-w-md bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
                >
                    Enviar Código Manual
                </button>
            </form>
        </div>
    );
};

export default Escanear;
