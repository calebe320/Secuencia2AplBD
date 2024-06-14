import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Barra';
import Inicio from './components/Inicio';
import FormularioProducto from './components/FormularioProducto';
import FormularioCliente from './components/FormularioCliente';
import FormularioVenta from './components/FormularioVenta';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
		<Route path="/Clientes" element={<FormularioCliente/>} />
        <Route path="/Productos" element={<FormularioProducto />} />
        <Route path="/Ventas" element={<FormularioVenta/>} />
      </Routes>
    </div>
  );
};

export default App;
