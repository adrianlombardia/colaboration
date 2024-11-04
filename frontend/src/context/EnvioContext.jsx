import React, { createContext, useState } from 'react';

export const EnvioContext = createContext();

export const EnvioProvider = ({ children }) => {
    const [envioSeleccionado, setEnvioSeleccionado] = useState(null);

    return (
        <EnvioContext.Provider value={{ envioSeleccionado, setEnvioSeleccionado }}>
            {children}
        </EnvioContext.Provider>
    );
};
