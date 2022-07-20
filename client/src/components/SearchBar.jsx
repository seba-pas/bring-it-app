import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getProductsName } from '../actions/index'


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getProductsName(name))
        setCurrentPage(1)
    }

  return (
    <div>
        <input type="text"  placeholder='Buscar' value={name} onChange={(e) => handleInputChange(e)}/>
        <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  )
}
