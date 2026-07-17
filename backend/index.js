// 1. Importamos las librerías necesarias
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importamos nuestra conexión del archivo db.js

// 2. Cargamos las variables de entorno para usar el puerto configurado
require('dotenv').config();

// 3. Inicializamos Express
const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto del .env, o el 3000 por defecto

// 4. Middlewares (Filtros de seguridad y procesamiento)
app.use(cors()); // Permite que React se conecte sin problemas de bloqueo del navegador
app.use(express.json()); // Permite que Express entienda la información que le mandamos en formato JSON

// 5. Ruta de prueba para verificar que el servidor esté vivo
app.get('/api/test', (req, res) => {
    res.json({ mensaje: "¡El Backend del Sistema de Gestión está vivo y funcionando!" });
});

// 6. Ponemos al servidor a escuchar en el puerto indicado
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});