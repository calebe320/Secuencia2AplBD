<?php
/**
 * Abre una base de datos de SQLite
 * @return object apuntador al manejadro de la BD
 */
function abrirDB()
{
    $archivo="./basededatos.sqlite3";
    if(file_exists($archivo)){
        echo "la base de datos ya existe";
        return null;
    }else{
        $baseDeDatos = new PDO("sqlite:" . $archivo);
        $baseDeDatos->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $baseDeDatos;
    }
}

/**
 * crea la tabla productos si no existe
 * @param object $baseDeDatos manejador de base de datos de sqlite
 */
function crearTablaProductos($baseDeDatos)
{
    $definicionTabla = "create table if not exists productos(
        id integer primary key autoincrement,
           nombre varchar(30),
           descripcion varchar(50),
           cantidad integer,
           precio float
           
       );";

    $resultado = $baseDeDatos->exec($definicionTabla);
    return $resultado;
}
/**
 * crea la tabla alumnos si no existe
 * @param object $baseDeDatos manejador de base de datos de sqlite
 */
function crearTablaClientes($baseDeDatos)
{
    $definicionTabla = "create table if not exists distribuidores(
        id integer primary key autoincrement,
        nombre varchar(30),
		apellido varchar(30),
		direccion varchar(30),
		ciudad varchar(30),
		provincia varchar(30),
		nombre varchar(30),
		codigo_postal varchar(30),
        telefono varchar(10),
        email varchar(30),
        genero varchar(30)
        
    );";

    $resultado = $baseDeDatos->exec($definicionTabla);
    return $resultado;
}

function crearTablaVentas($baseDeDatos)
{
    $definicionTabla = "create table if not exists ventas(
        id integer primary key autoincrement,
        nombre varchar(30),
        producto varchar(20),
        precio float,
        cantidad integer,
        total float
    
        
    );";

    $resultado = $baseDeDatos->exec($definicionTabla);
    return $resultado;
}

/**
 * Inserta un datos recibe un arreglo de esta forma:
 * $datosParte=[
 *	"nombre" => "",
 *	"alias" => ""
 *];
 *@param array $tipoParte array
 *@param object $baseDeDatos apuntador al manejador de base de datos
 *@return boolean sucess o fail
 */
function insertaProducto($baseDeDatos, $producto)
{
    $query="insert into productos(nombre, descripcion, stock, precio, cantidad) VALUES(:nombre, :descripcion, :stock, :precio, :cantidad);";
    $sentencia = $baseDeDatos->prepare($query);
    $resultado = $sentencia->execute($producto);
    if ($resultado === true) {
        http_response_code(200);
        return true;
    } else {
        http_response_code(400);
        return false;
    }
}

function insertaCliente($baseDeDatos, $distribuidor)
{
    $query="insert into distribuidores(nombre, apellido, direccion, ciudad, provincia, codigo_postal,telefono, email, genero) VALUES(:nombre, :apellido, :direccion, :ciudad, provincia, :codigo_postal,telefono, :email, :genero);";
    $sentencia = $baseDeDatos->prepare($query);
    $resultado = $sentencia->execute($distribuidor);
    if ($resultado === true) {
        http_response_code(200);
        return true;
    } else {
        http_response_code(400);
        return false;
    }
}

function insertaVenta($baseDeDatos, $venta)
{
    $query="insert into ventas(nombre, producto, precio, cantidad, total) VALUES(:nombre, :producto, :precio, :cantidad, :total);";
    $sentencia = $baseDeDatos->prepare($query);
    $resultado = $sentencia->execute($venta);
    if ($resultado === true) {
        http_response_code(200);
        return true;
    } else {
        http_response_code(400);
        return false;
    }
}

/**
 * Inserta un conjunto de registros de ejemplo
 * @param object $baseDeDatos manejador de la bd 
 * @param array $DatosPartes arreglo asociativo con la lista de datos a insertar
 */
function insertaDatosProductos($baseDeDatos, $DatosProductos)
{
    //insertar datos de ejeplo
    $producto = [
        "nombre" => "",
        "categoria" => "",
        "descripcion" => "",
        "stock" => "",
        "precio" => ""
    ];
    foreach ($DatosProductos as $valor) {
        $producto["nombre"] = $valor["nombre"];
        $producto["categoria"] = $valor["categoria"];
        $producto["descripcion"] = $valor["descripcion"];
        $producto["stock"] = $valor["stock"];
        $producto["precio"] = $valor["precio"];
        insertaProducto($baseDeDatos, $producto);
    }
}

function insertaDatosCliente($baseDeDatos, $DatosDistribuidores)
{
    //insertar datos de ejeplo
    $cliente = [
        "nombre" => "",
        "telefono" => "",
        "direccion" => "",
        "correo" => ""
    ];
    foreach ($DatosDistribuidores as $valor) {
        $producto["nombre"] = $valor["nombre"];
        $producto["telefono"] = $valor["telefono"];
        $producto["direccion"] = $valor["direccion"];
        $producto["correo"] = $valor["correo"];
        insertaProducto($baseDeDatos, $distribuidor);
    }
}


function insertaDatosVentas($baseDeDatos, $DatosVentas)
{
    //insertar datos de ejeplo
    $venta = [
        "nombre" => "",
        "categoria" => "",
        "precio" => "",
        "cantidad" => "",
        "total" => ""
    ];
    foreach ($DatosVentas as $valor) {
        $producto["nombre"] = $valor["nombre"];
        $producto["categoria"] = $valor["categoria"];
        $producto["precio"] = $valor["precio"];
        $producto["cantidad"] = $valor["cantidad"];
        $producto["total"] = $valor["total"];
        insertaVenta($baseDeDatos, $venta);
    }
}

$db = abrirDB();
if ($db) {
    try{
        crearTablaProductos($db);
        insertaDatosProductos($db, $DatosProductos);
        crearTablaClientes($db);
        insertaDatosClientes($db, $DatosClientes);
        crearTablaVentas($db);
        insertaDatosVentas($db, $DatosVentas);
        http_response_code(200);
        echo "ok";
    }catch(Exception $Exception){
        http_response_code(400);
        echo "Error: " . $Exception;
    }
} else {
    http_response_code(400);
    echo "la base de datos ya existe";
}

?>