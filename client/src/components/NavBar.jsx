import React from 'react';
import {NavLink} from 'react-router-dom';
import image from '../components/img/logoCUT.png'

export default function NavBar() {
  return (
    <header>
        <div>
            <NavLink exact to='/'>
                <img src={image} style={{width:'auto', height: '100px'}} alt="Logo no encontrado" />
            </NavLink>
        </div>
        <nav>
            <ul>
                <div>
                    <button>
                        <NavLink to='/Login'>Ingresar</NavLink>
                    </button>
                    <button>
                        <NavLink to='/Register'>Registrarse</NavLink>
                    </button>

                </div>
            </ul>

        </nav>

    </header>
  )
}

