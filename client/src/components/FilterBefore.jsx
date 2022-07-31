import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import NavBarAlone from './NavBarAlone';
import NavBarProvince from './NavBarProvince';
import "bootstrap/dist/css/bootstrap.min.css";


export default function FilterBefore() {
  return (
    <div>
      <div>
        <NavBarAlone/>
        <Link to='/filtroprov'>
        <button className="btn btn-primary">
            Productos por provincias
        </button>
        </Link>
        <Link to='/persona'>
        <button className='btn btn-primary'>
            Todos los productos
        </button>
        </Link>
    </div>
    </div>
  )
}
