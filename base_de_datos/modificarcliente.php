<?php

// Conexión a la base de datos SQLite
$db = new SQLite3('basededatos.sqlite3');

// Obtener los datos del cuerpo de la solicitud (request body)
$data = json_decode(file_get_contents('php://input'), true);

// Extraer los datos del cliente
$id = $data['id'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$direccion = $data['direccion'];
$ciudad = $data['ciudad'];
$provincia = $data['provincia'];
$codigo_postal = $data['codigo_postal'];
$telefono = $data ['telefono'];
$email = $data['email'];
$genero = $data['genero'];

// Preparar la consulta SQL para actualizar el cliente
$stmt = $db->prepare('UPDATE distribuidores SET nombre = :nombre, apellido = :apellido, direccion = :direccion, ciudad = :ciudad, provincia = :provincia, codigo_postal = :codigo_postal, telefono = :telefono, email = :email, genero = :genero WHERE id = :id');
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);
$stmt->bindValue(':nombre', $nombre, SQLITE3_TEXT);
$stmt->bindValue(':apellido', $apellido, SQLITE3_TEXT);
$stmt->bindValue(':direccion', $direccion, SQLITE3_TEXT);
$stmt->bindValue(':ciudad', $ciudad, SQLITE3_TEXT);
$stmt->bindValue(':provincia', $provincia, SQLITE3_TEXT);
$stmt->bindValue(':codigo_postal', $codigo_postal, SQLITE3_TEXT);
$stmt->bindValue(':telefono', $telefono, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$stmt->bindValue(':genero', $genero, SQLITE3_TEXT);


// Ejecutar la consulta
$result = $stmt->execute();

if ($result) {
    // Éxito al actualizar el cliente
    $response = array('message' => 'Cliente actualizado correctamente');
    http_response_code(200); // Código 200: OK
    echo json_encode($response);
} else {
    // Error al actualizar el distribuidor
	$response = array('message' => 'Error al intentar actualizar el cliente');
    http_response_code(500); // Código 500: Internal Server Error
    echo json_encode($response);
}

$db->close();
?>