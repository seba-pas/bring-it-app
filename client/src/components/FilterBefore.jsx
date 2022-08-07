import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import NavBarAlone from './NavBarAlone';
import NavBarProvince from './NavBarProvince';
import "bootstrap/dist/css/bootstrap.min.css";
import imagen from './img/tinywow_jpg_to_png_3900240-removebg-preview.png'


export default function FilterBefore() {
  return (
    <div style={{backgroundColor: 'white', justifyContent:'center'}}>
      <NavBarProvince/>
      <div style={{display:'flex', justifyContent: 'center', marginTop:'40px'}}>

        <div style={{color: '#8c52ff', display:'flex', marginTop:'40px', marginLeft:'100px', fontSize:'10px' }}>
        <h3>Presiona el mapa para ver por provincias</h3>
        </div>
      <div style={{justifyContent: 'center',height: "80vh", display: 'flex', marginTop: "15vh", textDecoration:'none'}}>
      <Link to='persona/filtroprov'>
        <img src={imagen} alt="Imagen no encontrada" />
        </Link> 
        <Link to='/persona'>
        <button className='btn btn-primary' style={{width: '400px', fontWeight: '22px', marginTop:'180px', marginLeft: '26px'}}>
            Ver todos los productos
        </button>
        </Link>
    </div>
      </div>
    </div>
    
  )
}
