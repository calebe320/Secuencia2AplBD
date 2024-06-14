CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(30),
    descripcion VARCHAR(50),
    stock INTEGER,
    precio FLOAT,
    cantidad INTEGER
);

CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    direccion VARCHAR(30),
    ciudad VARCHAR(30),
    provincia VARCHAR(30),
    codigo_postal VARCHAR(30),
    telefono VARCHAR(30),
    email VARCHAR(30),
    genero VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(30),
    producto VARCHAR(10),
    precio FLOAT,
    cantidad INTEGER,
    total FLOAT
);
