import React from 'react';
import { Link } from 'react-router-dom';

const Barra = () => {
  return (
    <nav className='w3-bar w3-light-blue w3-center'>
      <ul>
        <li className='w3-bar-item'>
          <Link to="/Clientes" className='w3-button w3-border w3-border-light-blue w3-hover-blue w3-text-white'>Clientes</Link>
        </li>
        <li className='w3-bar-item'>
          <Link to="/Ventas" className='w3-button w3-border w3-border-light-blue w3-hover-blue w3-text-white'>Ventas</Link>
        </li>
        <li className='w3-bar-item'>
          <Link to="/Productos" className='w3-button w3-border w3-border-light-blue w3-hover-blue w3-text-white'>Productos</Link>
        </li>
      </ul>
    </nav>
  );
};


export default Barra;