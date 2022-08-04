import React from 'react'
import { useHistory } from 'react-router-dom';

function Unauthorized() {

	const history = useHistory()

	const handleVolver = (e) => {
		e.preventDefault();
		history.push("/filtro")
	}

	return (
		<div className="container-un">
			<h1 className='title-un'>NO PODÉS ACCEDER ACÁ GATÍN</h1>
			<h3 className='subtitle-un'>Pegá la vuelta nomá</h3>
			<button className='un-btn' onClick={handleVolver}>VOLVER</button>
		</div>
	)
}


export default Unauthorized;