const mysql = require('mysql2/promise'); //Importamos la librería mysql2 (versión promesas para usar async/await)

require('dotenv').config(); // Importamos y configuramos 'dotenv' para que lea nuestro archivo .env

// Creamos el grupo de conexiones (Pool) usando las variables del .env
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos el pool para poder usarlo en otros archivos del backend
module.exports = pool;