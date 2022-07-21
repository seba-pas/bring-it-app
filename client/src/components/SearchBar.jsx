import React, { useState } from "react";
import style from "../styles/SearchBar.module.css";
// import { useDispatch } from 'react-redux';
// import { getProductsName } from '../actions/index'
import { BsSearch } from "react-icons/bs";

export default function SearchBar({ setCurrentPage }) {
  // const dispatch = useDispatch();
  // const [name, setName] = useState('');

  // function handleInputChange(e){
  //     e.preventDefault();
  //     setName(e.target.value);
  // }

  // function handleSubmit(e){
  //     e.preventDefault();
  //     dispatch(getProductsName(name))
  //     setCurrentPage(1)
  // }
  
  return (
    <div className={style.divContainer}>
      

      <input type="text"  placeholder='Buscar' />
      {/* <div className={style.divButtonSearch}> */}
      <button className={style.buttonSearch}>
        <BsSearch />
      </button>
      {/* </div> */}
    </div>
  );
}
