// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Almacen from './pages/Almacen';
import Escanear from './pages/Escanear';
import GestionEnvios from './pages/GestionEnvios';
import { EnvioProvider } from './context/EnvioContext';
import BannerEnvio from './components/BannerEnvio';
import MenuInferior from './components/MenuInferior';
import InfoEnvio from './pages/InfoEnvio';
import VerAlmacenes from './pages/VerNecesidadesAlmacenes';
import DetallesAlmacen from './pages/DetallesAlmacen';
import Layout from './components/Layout'; // Importa el componente de Layout

function App() {
  return (
    <EnvioProvider>
      <Router>
        <BannerEnvio />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/almacen" element={<Almacen />} />
            <Route path="/escanear" element={<Escanear />} />
            <Route path="/nuevoEnvio" element={<GestionEnvios />} />
            <Route path="/infoEnvio/:id" element={<InfoEnvio />} />
            <Route path="/verNecesidadesAlmacenes" element={<VerAlmacenes />} />
            <Route path="/detallesAlmacen/:id" element={<DetallesAlmacen />} />
          </Routes>
        </Layout>
        <MenuInferior />
      </Router>
    </EnvioProvider>
  );
}

export default App;
