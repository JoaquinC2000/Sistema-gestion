// Importamos las librerías necesarias
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importamos nuestra conexión del archivo db.js

// Cargamos las variables de entorno para usar el puerto configurado
require('dotenv').config();

// Inicializamos Express
const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto del .env, o el 3000 por defecto

// Middlewares (Filtros de seguridad y procesamiento)
app.use(cors()); // Permite que React se conecte sin problemas de bloqueo del navegador
app.use(express.json()); // Permite que Express entienda la información que le mandamos en formato JSON

// Ruta de prueba para verificar que el servidor esté vivo
app.get('/api/test', (req, res) => {
    res.json({ mensaje: "¡El Backend del Sistema de Gestión está vivo y funcionando!" });
});

// RUTA DE REGISTRO: Crear un nuevo usuario en la base de datos (POST)
app.post('/api/usuarios/registrar', async (req, res) => {
    // Desestructuración: Extraemos los datos que React nos manda en el cuerpo del formulario
    const { nombre, email, password, rol } = req.body;

    // Validación de campos: Si falta alguno de los tres esenciales, frenamos la ejecución
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Faltan campos obligatorios: nombre, email y password" });
    }

    try {
        // Control de duplicados: Consultamos a MySQL si ya existe alguien con ese mismo correo
        const [usuariosExistentes] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        // Si el array contiene algún elemento (length > 0), significa que el email ya está ocupado
        if (usuariosExistentes.length > 0) {
            return res.status(400).json({ error: "El correo electrónico ya está registrado en el sistema" });
        }

        // Inserción: Si el email está libre, guardamos al nuevo usuario
        // Usamos los "?" por seguridad absoluta contra Inyección SQL
        const [resultado] = await db.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, password, rol || 'Empleado'] // Si no mandan rol, por defecto va 'Empleado'
        );

        // Respuesta de éxito: Le respondemos al cliente el ID que autogeneró MySQL y sus datos básicos
        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            usuario: {
                id: resultado.insertId,
                nombre,
                email,
                rol: rol || 'Empleado'
            }
        });

    } catch (error) {
        // Si algo falla a nivel servidor o base de datos, atrapamos el error en el catch
        console.error("Error en el registro de usuario:", error);
        res.status(500).json({ error: "Error interno del servidor al registrar el usuario" });
    }
});

// RUTA DE LOGIN: Autenticar a un usuario existente (POST)
app.post('/api/usuarios/login', async (req, res) => {
    // 1. Extraemos el email y la contraseña que vienen del formulario de React
    const { email, password } = req.body;

    // 2. Control inicial: Si el usuario mandó alguno de los dos campos vacíos, rebotamos
    if (!email || !password) {
        return res.status(400).json({ error: "Por favor, complete todos los campos" });
    }

    try {
        // 3. Buscamos en MySQL si existe un usuario registrado con ese email exacto
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        // Si el array vuelve vacío (length === 0), significa que ese correo no existe
        if (usuarios.length === 0) {
            return res.status(404).json({ error: "El correo electrónico no está registrado" });
        }

        // 4. Extraemos el usuario encontrado (como el email es único, viene en la posición 0)
        const usuarioEncontrado = usuarios[0];

        // 5. Comparación de contraseña
        if (usuarioEncontrado.password !== password) {
            // Si la contraseña ingresada no coincide con la guardada en la base de datos
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // 6. ¡Éxito! Si llegó hasta acá, el usuario es legítimo. Respondemos con sus datos (sin la clave)
        res.json({
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email,
                rol: usuarioEncontrado.rol
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: "Error interno del servidor al intentar ingresar" });
    }
});

// Ponemos al servidor a escuchar en el puerto indicado
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});