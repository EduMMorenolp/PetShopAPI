const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos no está en localhost
  user: 'tu_usuario', // Reemplaza con tu usuario de MySQL
  password: 'tu_contraseña', // Reemplaza con tu contraseña de MySQL
  database: 'petshopAPI' // Reemplaza con el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectándose a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos como id ' + connection.threadId);
});

module.exports = connection;