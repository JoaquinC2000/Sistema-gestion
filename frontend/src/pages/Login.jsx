import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el gancho para navegar

function Login() {
  const navigate = useNavigate(); // 2. Inicializamos la función de navegación

  const manejarIngreso = (e) => {
    e.preventDefault();
    // Acá en el futuro irá la validación real con el Backend.
    // Por ahora, si toca el botón, lo mandamos directo al panel principal.
    navigate('/panel'); 
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-800 text-center mb-2">📦 Sistema de Gestión</h2>
        <p className="text-sm text-slate-500 text-center mb-6">Bienvenido. Inicie sesión para continuar.</p>
        
        <form onSubmit={manejarIngreso} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
            <input type="email" placeholder="ejemplo@correo.com" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow transition-colors cursor-pointer">
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;