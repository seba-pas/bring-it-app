import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavBar() {
  return (
    <header>
        <div>
            <NavLink exact to='/'>
                <img src="" alt="Logo no encontrado" />
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

