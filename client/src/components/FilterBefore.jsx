import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import NavBarAlone from './NavBarAlone';
import NavBarProvince from './NavBarProvince';


export default function FilterBefore() {
  return (
    <div>
      <div>
        <NavBarAlone/>
        <Link to='/filtroprov'>
        <button>
            Productos por provincias
        </button>
        </Link>
        <Link to='/persona'>
        <button>
            Todos los productos
        </button>
        </Link>
    </div>
    </div>
  )
}
