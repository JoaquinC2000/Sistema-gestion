import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="w-64 bg-slate-800 text-slate-100 flex flex-col justify-between p-4">
        <div>
          <div className="text-xl font-black tracking-wider mb-8 text-white border-b border-slate-700 pb-3">
            📊 GESTIÓN PRO
          </div>
          <nav className="space-y-2">
            <a href="#inicio" className="block py-2 px-4 rounded-lg bg-slate-700 font-medium text-sm text-white">🏠 Inicio</a>
            <a href="#inventario" className="block py-2 px-4 rounded-lg hover:bg-slate-700 font-medium text-sm text-slate-300 hover:text-white transition-colors">📦 Inventario</a>
            <a href="#ventas" className="block py-2 px-4 rounded-lg hover:bg-slate-700 font-medium text-sm text-slate-300 hover:text-white transition-colors">💰 Ventas</a>
            <a href="#clientes" className="block py-2 px-4 rounded-lg hover:bg-slate-700 font-medium text-sm text-slate-300 hover:text-white transition-colors">👥 Clientes</a>
          </nav>
        </div>
        
        {/* Botón para Salir abajo del todo */}
        <button 
          onClick={() => navigate('/')} 
          className="w-full text-left py-2 px-4 rounded-lg bg-red-900/40 hover:bg-red-900 text-red-200 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          🚪 Cerrar Sesión
        </button>
      </aside>

      {/* CONTENEDOR PRINCIPAL DE CONTENIDO */}
      <main className="flex-1 p-8 text-slate-800">
        <header className="mb-6 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight">Bienvenido al Panel de Control</h1>
          <p className="text-slate-500 text-sm mt-1">Este es el estado actual de tu negocio hoy.</p>
        </header>

        {/* Tarjetas de Estadísticas Rápidas (Simuladas) */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Ventas del Mes</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">$0.00</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Productos en Stock</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">0 unidades</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Clientes Activos</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">0 registrados</h3>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Dashboard;