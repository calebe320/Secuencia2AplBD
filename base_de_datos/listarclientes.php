<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir la configuración de la conexión a la base de datos SQLite
include 'conexion.php'; 

try {
    // Consulta SQL para seleccionar todos los distribuidores
    $query = "SELECT * FROM clientes";
    $statement = $conex->prepare($query);
    $statement->execute();

    // Obtener los resultados de la consulta
    $clientes = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los distribuidores como JSON
    echo json_encode($clientes);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error al obtener clientes: " . $e->getMessage()));
}
?>