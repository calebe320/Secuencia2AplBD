<?php

// Verificar si la solicitud es de tipo OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    exit();
}

// Headers CORS para respuestas normales
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Verificar si el método de solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Incluir archivo de conexión a la base de datos SQLite
    include 'conexion.php'; // Asegúrate de que este archivo establece la conexión en $conex

    // Obtener los datos del cuerpo de la solicitud (request body)
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se recibieron los datos esperados
    if (
        empty($data['nombre']) || 
        empty($data['apellido']) || 
        empty($data['direccion']) || 
        empty($data['ciudad']) || 
        empty($data['provincia']) || 
        empty($data['codigo_postal']) || 
        empty($data['telefono']) || 
        empty($data['email']) || 
        empty($data['genero'])
    ) {
        http_response_code(400); // Bad Request
        echo json_encode(array('message' => 'Faltan datos requeridos para insertar el cliente'));
        exit();
    }

    // Preparar los datos del cliente
    $cliente = [
        'nombre' => $data['nombre'],
        'apellido' => $data['apellido'],
        'direccion' => $data['direccion'],
        'ciudad' => $data['ciudad'],
        'provincia' => $data['provincia'],
        'codigo_postal' => $data['codigo_postal'],
        'telefono' => $data['telefono'],
        'email' => $data['email'],
        'genero' => $data['genero']
    ];

    try {
        // Preparar la consulta SQL para insertar el cliente
        $query = 'INSERT INTO clientes (nombre, apellido, direccion, ciudad, provincia, codigo_postal, telefono, email, genero) VALUES (:nombre, :apellido, :direccion, :ciudad, :provincia, :codigo_postal, :telefono, :email, :genero)';
        $statement = $conex->prepare($query);

        // Ejecutar la consulta con los datos del cliente
        $result = $statement->execute($cliente);

        if ($result) {
            $id = $conex->lastInsertId(); // Obtener el ID del cliente insertado
            http_response_code(201); // Código 201: Created
            echo json_encode(array('message' => 'Cliente insertado correctamente', 'id' => $id));
        } else {
            http_response_code(400); // Código 400: Bad Request
            echo json_encode(array('message' => 'Error al intentar insertar el cliente'));
        }
    } catch (PDOException $e) {
        http_response_code(500); // Código 500: Internal Server Error
        echo json_encode(array('message' => 'Error en la base de datos: ' . $e->getMessage()));
    } catch (Exception $e) {
        http_response_code(500); // Código 500: Internal Server Error
        echo json_encode(array('message' => 'Error en el servidor: ' . $e->getMessage()));
    }
} else {
    // Si el método de solicitud no es POST, retornar un error
    http_response_code(405); // Código 405: Method Not Allowed
    echo json_encode(array('message' => 'Método no permitido'));
}
?>
