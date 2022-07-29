import React, { useState } from "react";
import style from "../styles/SearchBar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from "react-icons/bs";
import { getAllProducts, getAllProductsName } from "../actions";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const PRODUCT = useSelector((state) => state.products)
  
  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
  }
  
  function handleSubmit(e){
    e.preventDefault();
    dispatch(getAllProductsName(name))
    setName('')
    // if(!name) {
    //     setTimeout(() => {
    //       setName('')
    //       dispatch(getAllProducts())
    //     },5000)
    //   }
  }

  // function onClick(e) {
  //   e.preventDefault();
  //   dispatch(getAllProducts(search))
  //   setSearch('')
  // }
  
  return (
    <div className={style.divContainer}>
      

      <input type="text"  placeholder='Buscar productos...' value={name} onChange={(e) => handleInputChange(e) } />
      {/* <div className={style.divButtonSearch}> */}
      <button className="btn btn-primary" id={style.boton} type="submit" onClick={(e) => handleSubmit(e)}>
        <BsSearch />
      </button>
      {/* </div> */}
    </div>
  );
}

