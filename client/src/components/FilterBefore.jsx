import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import NavBarAlone from './NavBarAlone';
import NavBarProvince from './NavBarProvince';
import "bootstrap/dist/css/bootstrap.min.css";


export default function FilterBefore() {
  return (
    <div style={{backgroundColor: 'white'}}>
        <NavBarAlone/>
      <div style={{justifyContent: 'space-evenly',height: "100vh", display: 'flex', paddingTop: "30vh"}}>
        <Link to='/filtroprov'>
        <button className="btn btn-primary" style={{width: '400px', fontWeight: '22px'}}>
            Productos por provincias
        </button>
        </Link>
        <Link to='/persona'>
        <button className='btn btn-primary' style={{width: '400px', fontWeight: '22px'}}>
            Todos los productos
        </button>
        </Link>
    </div>
    </div>
  )
}
