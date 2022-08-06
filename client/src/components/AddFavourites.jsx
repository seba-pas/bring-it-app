import React from 'react';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { postFavourites } from '../actions';

export default function AddFavourites() {


    const handleClick = (e) => {
    e.preventDefault();
    postFavourites()
    
    }
  return (
    <div>
        <button onClick={(e) => handleClick(e)}>
            <span aria-label='Fav' role='img'>🤍</span>
        </button>
    </div>
  )
}
