import React from 'react';


const Inicio = () => {
    const estiloPagina = {
        background: 'linear-gradient(to bottom right, #61a5c2, #88b1cc)',  // Fondo con gradiente azul
        minHeight: 'calc(100vh - 72px)',  // Altura mínima que evita que el contenido se superponga con la barra de navegación
        padding: '20px',  // Espaciado interno para el contenido
        color: '#fff',  // Color de texto blanco para todo el contenido
        textAlign: 'center',  // Texto centrado
    };

    const estiloTabla = {
        width: '80%',  // Ancho de la tabla
        margin: 'auto',  // Centrado horizontal de la tabla
        marginTop: '30px',  // Margen superior
        borderCollapse: 'collapse',  // Colapso de bordes de la tabla
    };

    const estiloCelda = {
        border: '1px solid #fff',  // Borde de celda blanco
        padding: '10px',  // Espaciado interno de celda
    };

    const productosPopulares = [
        { id: 1, nombre: 'Peluche de oso gigante', precio: '$39.99' },
        { id: 2, nombre: 'Set de bloques de construcción', precio: '$29.99' },
        { id: 3, nombre: 'Muñeca parlante interactivo', precio: '$49.99' },
        { id: 4, nombre: 'Carrito de control remoto', precio: '$24.99' },
    ];

    return (
        <div style={estiloPagina}>
            <div className="w3-container">
                <h1 style={{ fontSize: '3em', color: '#f2f2f2', fontWeight: 'bold', marginBottom: '20px' }}>Sistema de Gestión de la Tienda Juguetes Felices</h1>

                <h2 style={{ fontSize: '2em', color: '#f2f2f2', marginTop: '30px' }}>Los productos más vendidos.</h2>
                <table style={estiloTabla}>
                    <thead>
                        <tr>
                            <th style={estiloCelda}>ID</th>
                            <th style={estiloCelda}>Nombre del Producto</th>
                            <th style={estiloCelda}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosPopulares.map(producto => (
                            <tr key={producto.id}>
                                <td style={estiloCelda}>{producto.id}</td>
                                <td style={estiloCelda}>{producto.nombre}</td>
                                <td style={estiloCelda}>{producto.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inicio;
