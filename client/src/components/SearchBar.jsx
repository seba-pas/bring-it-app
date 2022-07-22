import React, { useState } from "react";
import style from "../styles/SearchBar.module.css";
import { useDispatch } from 'react-redux';
import { BsSearch } from "react-icons/bs";
import { getAllProductsName } from "../actions";

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e){
      e.preventDefault();
      setName(e.target.value);
  }

  function handleSubmit(e){
      e.preventDefault();
      dispatch(getAllProductsName(name))
      setCurrentPage(1)
  }
  
  return (
    <div className={style.divContainer}>
      

      <input type="text"  placeholder='Buscar' value={name} onChange={(e) => handleInputChange(e) } />
      {/* <div className={style.divButtonSearch}> */}
      <button className={style.buttonSearch} type="submit" onClick={(e) => handleSubmit(e)}>
        <BsSearch />
      </button>
      {/* </div> */}
    </div>
  );
}

