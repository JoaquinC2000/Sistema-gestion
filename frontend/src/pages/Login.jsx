import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // ESTADOS LOCALES: Variables para guardar lo que el usuario tipea y controlar alertas
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Guarda el texto de las alertas en rojo
  const [cargando, setCargando] = useState(false); // Para desactivar el botón mientras responde el servidor

  // FUNCIÓN PARA VALIDAR EL FORMATO DEL CORREO (que tenga texto + @ + texto + .dominio)
  const esEmailValido = (correo) => {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(correo);
  };

  // FUNCIÓN QUE SE EJECUTA AL DARLE CLIC AL BOTÓN
  const manejarIngreso = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue por defecto
    setError(''); // Limpiamos errores anteriores

    // VALIDACIÓN LOCAL 1: ¿Dejó campos vacíos?
    if (!email.trim() || !password.trim()) {
      setError('Por favor, ingrese correo y contraseña.');
      return; // El 'return' frena la función acá; no deja que se envíe la petición
    }

    setCargando(true); // Bloqueamos el botón temporalmente

    // 3. PETICIÓN REAL AL BACKEND
    fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setCargando(false);

        // Si el backend nos devolvió un mensaje de error (ej: contraseña mal o mail no registrado)
        if (datos.error) {
          setError(datos.error); // Mostramos el cartel rojo con la explicación del servidor
        } else {
          // ¡SI LLEGÓ ACÁ, TODO ESTÁ OK!
          // Redirigimos al usuario al Dashboard
          navigate('/panel');
        }
      })
      .catch((err) => {
        setCargando(false);
        console.error("Error al conectar con el servidor:", err);
        setError("No se pudo conectar con el servidor. Verifique si el Backend está prendido.");
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-800 text-center mb-2">📦 Sistema de Gestión</h2>
        <p className="text-sm text-slate-500 text-center mb-6">Bienvenido. Inicie sesión para continuar.</p>
        
        {/* CARTEL DE ERROR (Solo se dibuja si la variable 'error' tiene algún texto) */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-lg mb-4 text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={manejarIngreso} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Guardamos lo que tipea en la variable 'email'
              placeholder="ejemplo@correo.com" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Guardamos lo que tipea en la variable 'password'
              placeholder="••••••••" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" 
            />
          </div>
          <button 
            type="submit" 
            disabled={cargando}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow transition-colors cursor-pointer disabled:bg-blue-300"
          >
            {cargando ? 'Verificando...' : 'Ingresar al Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;