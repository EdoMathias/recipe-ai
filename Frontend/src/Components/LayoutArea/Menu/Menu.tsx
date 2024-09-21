import { NavLink } from 'react-router-dom';
import './Menu.css';
import React from 'react';

function Menu(): React.ReactElement {
  return (
    <div className="Menu">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/list">List</NavLink>
      <NavLink to="/new">New</NavLink>
    </div>
  );
}

export default Menu;
