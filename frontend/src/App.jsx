import React from 'react';
// Importamos las herramientas de empaquetado de rutas de la librería
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importamos nuestras dos pantallas nuevas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    // 1. BrowserRouter envuelve toda la app para habilitar la navegación por URL
    <BrowserRouter>
      {/* 2. Routes actúa como un switch que decide qué pantalla mostrar */}
      <Routes>
        
        {/* 3. Definimos que la ruta raíz "/" carga el componente Login */}
        <Route path="/" element={<Login />} />
        
        {/* 4. Definimos que la ruta "/panel" carga el componente Dashboard */}
        <Route path="/panel" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;