import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { datos } from '../api/GetCliente'; // Importa los datos iniciales

const NuevoClienteForm = () => {
    const [newCliente, setNewCliente] = useState({
        id_cliente: '', // El ID se generará automáticamente
        nom_cliente: '',
		apellido_cliente '',
        direccion: '',
		ciudad: '',
		provincia: '',
		codigo_postal: '',
		telefono: '',
        email: '',
		genero: ''
		
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...newCliente, [name]: value });
    };

    const generateUniqueID = () => {
        let newID;
        do {
            newID = Math.floor(Math.random() * 1000); // Generar un ID aleatorio entre 0 y 999
        } while (datos.some(cliente => cliente.id_cliente === newID));
        return newID;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newID = generateUniqueID();
        const newProvider = { ...newCliente, id_cliente: newID };
        datos.push(newProvider); // Agregar el nuevo proveedor a la lista de datos
        alert('Cliente agregado con éxito');
        navigate('/Clientes');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="w3-left-align"><h1>Nuevo proveedor</h1></div><br></br>
			<input className='w3-input' name="nom_cliente" value={newCliente.nom_cliente} onChange={handleChange} placeholder="Nombre" required /><br></br>
			<input className='w3-input' name="apellido_cliente" value={newCliente.apellido_cliente} onChange={handleChange} placeholder="Apellido" required /><br></br>
			<input className='w3-input' name="direccion" value={newCliente.direccion} onChange={handleChange} placeholder="Direccion" required /><br></br>
			<input className='w3-input' name="ciudad" value={newCliente.ciudad} onChange={handleChange} placeholder="Ciudad" required /><br></br>
			<input className='w3-input' name="provincia" value={newCliente.provincia} onChange={handleChange} placeholder="Provincia" required /><br></br>
			<input className='w3-input' name="codigo_postal" value={newCliente.codigo_postal} onChange={handleChange} placeholder="Codigo Postal" required /><br></br>
			<input className='w3-input' name="telefono" value={newCliente.telefono} onChange={handleChange} placeholder="Telefono" required /><br></br>
			<input className='w3-input' name="email" value={newCliente.email} onChange={handleChange} placeholder="Email" required /><br></br>
			<input className='w3-input' name="genero" value={newCliente.genero} onChange={handleChange} placeholder="Genero" required /><br></br>
            <button className='w3-button w3-blue w3-block w3-hover-light-blue' type="submit">Agregar Cliente</button>
        </form>
    );
};

export default NuevoClienteForm;
