import React from 'react'
import { useHistory } from 'react-router-dom';
import './Unauthorized.css'

function Unauthorized() {

	const history = useHistory()

	const handleVolver = (e) => {
		e.preventDefault();
		history.push("/")
	}

	return (
		<div className="container-un">
			<h1 className='title-un'>USUARIO NO AUTORIZADO</h1>
			<button className='un-btn' onClick={handleVolver}>VOLVER A LANDING</button>
		</div>
	)
}


export default Unauthorized;