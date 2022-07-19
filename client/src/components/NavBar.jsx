import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavBar() {
  return (
    <header>
        <div>
            <img src="" alt="" />
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink to='/Login' >Log In</NavLink>
                    <NavLink to='/Register' >Register</NavLink>
                    <NavLink to='About' >About</NavLink>

                </li>
            </ul>

        </nav>

    </header>
  )
}

