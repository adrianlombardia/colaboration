import axios from 'axios';

const api = axios.create({
    baseURL: '/api/',
});

export const obtenerDatos = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
};

export const enviarDatos = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error al enviar datos:', error);
        throw error;
    }
};
