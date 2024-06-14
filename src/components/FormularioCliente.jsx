import React, { useState, useEffect } from 'react';

const FormularioCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [codigo_postal, setCodigo_postal] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [genero, setGenero] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);
    const [clienteEditar, setClienteEditar] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = () => {
        fetch('http://localhost/base_de_datos/listarclientes.php')
            .then(response => response.json())
            .then(data => {
                setClientes(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const cliente = {
            nombre,
            apellido,
            direccion,
            ciudad,
            provincia,
            codigo_postal,
            telefono,
            email,
            genero,
        };

        const url = modoEdicion ? 'http://localhost/base_de_datos/modificarcliente.php' : 'http://localhost/base_de_datos/insertarcliente.php';

        fetch(url, {
            method: modoEdicion ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === (modoEdicion ? 'Cliente actualizado correctamente' : 'Cliente insertado correctamente')) {
                setMensaje(`Cliente ${data.id} ${modoEdicion ? 'actualizado' : 'insertado'} correctamente.`);
                cargarClientes();
                cancelarEdicion();
            } else {
                setMensaje(`Error al intentar ${modoEdicion ? 'actualizar' : 'guardar'} el cliente.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const handleEliminarCliente = (id) => {
        fetch(`http://localhost/base_de_datos/eliminarcliente.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Cliente eliminado correctamente') {
                setMensaje(`Cliente con ID ${id} eliminado correctamente.`);
                cargarClientes();
            } else {
                setMensaje('Error al intentar eliminar el cliente.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const iniciarEdicion = (cliente) => {
        setModoEdicion(true);
        setClienteEditar(cliente);
        setNombre(cliente.nombre);
        setApellido(cliente.apellido);
        setDireccion(cliente.direccion);
        setCiudad(cliente.ciudad);
        setProvincia(cliente.provincia);
        setCodigo_postal(cliente.codigo_postal);
        setTelefono(cliente.telefono);
        setEmail(cliente.email);
        setGenero(cliente.genero);
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setClienteEditar(null);
        setNombre('');
        setApellido('');
        setDireccion('');
        setCiudad('');
        setProvincia('');
        setCodigo_postal('');
        setTelefono('');
        setEmail('');
        setGenero('');
    };

    return (
        <div className="w3-light-blue">
            <h2>Agregar Cliente </h2>
            <form className="w3-container w3-card-4 w3-light-blue w3-text-black w3-margin" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="apellido">Apellido:</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="direccion">Dirección:</label>
                <textarea
                    id="direccion"
                    name="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="ciudad">Ciudad:</label>
                <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="provincia">Provincia:</label>
                <input
                    type="text"
                    id="provincia"
                    name="provincia"
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="codigo_postal">Código Postal:</label>
                <input
                    type="text"
                    id="codigo_postal"
                    name="codigo_postal"
                    value={codigo_postal}
                    onChange={(e) => setCodigo_postal(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="genero">Género:</label>
                <input
                    type="text"
                    id="genero"
                    name="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <button type="submit" className="w3-button w3-block w3-section w3-green w3-ripple">
                    {modoEdicion ? 'Guardar Cambios' : 'Guardar'}
                </button>
                {modoEdicion && (
                    <button type="button" className="w3-button w3-block w3-section w3-red w3-ripple" onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                )}
            </form>

            {mensaje && <p>{mensaje}</p>}

            <h2>Lista de Clientes</h2>
            <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
                <thead>
                    <tr className="w3-black">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Provincia</th>
                        <th>Código Postal</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Género</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.ciudad}</td>
                            <td>{cliente.provincia}</td>
                            <td>{cliente.codigo_postal}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.genero}</td>
                            <td>
                                <button className="w3-button w3-red w3-hover-pink" onClick={() => handleEliminarCliente(cliente.id)}>
                                    Eliminar
                                </button>
                                <button className="w3-button w3-red w3-hover-pink" onClick={() => iniciarEdicion(cliente)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormularioCliente;
