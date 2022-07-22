import React from "react";
import styles from '../styles/Pagination.module.css'

export default function Pagination({productsPerPage, PRODUCTS, paginado}) {

    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(PRODUCTS/productsPerPage); i++)
    pageNumbers.push(i)

  return (
    <nav className={styles.paginado}>
        {pageNumbers.length === 1 ?
        <div></div>:
            (pageNumbers.map(num => {
                return(
                    <div key={num}>
                        <button onClick={() => paginado(num)}>{num}</button>
                    </div>
                )
            }))
        }
    </nav>
  )
}


