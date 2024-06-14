CREATE DATABASE IF NOT EXISTS petShop;
USE petShop;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'cliente') NOT NULL
);

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    peso DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255),
    u_medida VARCHAR(50),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
);
-- Tabla de Tipos de Productos
CREATE TABLE IF NOT EXISTS Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Tabla de Carrito de Compras
CREATE TABLE IF NOT EXISTS Carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    cantidad INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES Productos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de Órdenes
CREATE TABLE IF NOT EXISTS Ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'completada', 'cancelada') NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla de Detalles de Órdenes
CREATE TABLE IF NOT EXISTS OrdenDetalles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT,
    producto_id INT,
    cantidad INT,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES Ordenes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES Productos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insertar productos
INSERT INTO Productos (id, nombre, imagen, descripcion, precio, peso, u_medida) VALUES
(91, 'GATI PESCADO Y SALMON', './img/productos/Ofert1.webp', '10% OFF', 10, 3, 'Kg'),
(92, 'EXCELLENT PUPPY', './img/productos/Ofert2.webp', '30% OFF', 15, 2, 'Kg'),
(93, 'PRO PLAN PUPPY MEDIANO', './img/productos/Ofert3.webp', '15% OFF', 20, 3, 'Kg'),
(1, 'Sieger', 'img/productos/1.webp', '2kg Gratis', 150, 5, 'Kg'),
(2, 'Cat Chow', 'img/productos/2.webp', '3kg Gratis', 180, 5, 'Kg'),
(3, 'Complete', 'img/productos/3.webp', '2kg Gratis', 118, 5, 'Kg'),
(4, 'Balanced', 'img/productos/4.webp', '2kg Gratis', 141, 20, 'Kg'),
(5, 'Dog Selection', 'img/productos/5.webp', '2kg Gratis', 114, 3, 'Kg'),
(6, 'Eukanuba', 'img/productos/6.webp', '20% Gratis', 135, 15, 'Kg'),
(7, 'Ken-l', 'img/productos/7.webp', '3kg Gratis', 167, 3, 'Kg'),
(8, 'Premium', 'img/productos/8.webp', '2kg Gratis', 147, 2, 'Kg');


-- Insertar un administrador
INSERT INTO Usuarios (nombre, email, contraseña, rol) VALUES
('Admin', 'admin@example.com', SHA2('adminpassword', 256), 'admin');

-- Insertar un cliente
INSERT INTO Usuarios (nombre, email, contraseña, rol) VALUES
('Cliente', 'cliente@example.com', SHA2('clientepassword', 256), 'cliente');
