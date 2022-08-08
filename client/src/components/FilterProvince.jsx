import React from "react";
import styles from "../styles/HomePersonas.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
import {
  filterByBranchesProvince,
  getAllProducts,
  orderByPrice,
  setProduct,
} from "../actions";
import { SpinnerCircularFixed } from "spinners-react";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FilterProvince() {
  const dispatch = useDispatch();
  const PRODUCTS = useSelector((state) => state.products);
  const BRANCHES = useSelector((state) => state.branches);

  let provOrder = BRANCHES?.map((e) => e.province);
  provOrder = provOrder.sort((a, b) => {
    if(a > b) return  1;
    if(b > a) return -1;
    return 0;
  })

  const [orden, setOrden] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productsPerPage; // 10
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0
  const currentProducts = PRODUCTS.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(filterByBranchesProvince());
    return () => {
      dispatch(setProduct());
    };
  }, [dispatch]);

  //funcion para ordenar los precios
  function handleSort(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByPrice(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  //funcion para ordenar por
  const provUnica = [...new Set(provOrder)];
  function handleFilterByBranchesProvinces(e) {
    e.preventDefault();
    setOrden(e.target.value);
    setCurrentPage(1);
    dispatch(filterByBranchesProvince(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleClick(e) {
    e.preventDefault();
    setOrden("All");
    dispatch(getAllProducts());
    setCurrentPage(1);
  }

  return (
    <div className={styles.div}>
      <NavBar />
      {PRODUCTS && Object.entries(PRODUCTS).length > 0 && typeof PRODUCTS !== 'string' ? (

      PRODUCTS == "No se encontraron productos asociados" ? (
        <div style={{color:'#8c52ff', background:'white', marginTop:'150px'}}>
            <h1>No se encontraron productos asociados</h1>
            <button className='btn btn-primary' style={{marginTop: '40px'}} onClick={(e) => handleClick(e)}>Volver</button>
          </div>
          ) : (
            <div>
            <select
            value={BRANCHES.businessbranches}
            onChange={(e) => handleFilterByBranchesProvinces(e)}
            style={{
              color: "white",
              marginTop: "33px",
              backgroundColor: "#8c52ff",
              border: "none",
              fontSize: "18px",
              fontFamily: "Montserrat",
              fontWeight: "400",
              cursor: "pointer",
            }}
          >
            <option value="All">Todas</option>

            {provUnica?.map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => handleSort(e)}
            style={{
              color: "white",
              marginTop: "33px",
              backgroundColor: "#8c52ff",
              border: "none",
              fontSize: "18px",
              fontFamily: "Montserrat",
              fontWeight: "400",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            Todos
            <option value="Desordenado" hidden selected>
              Ordenar por
            </option>
            <option value="asc">Menor Precio</option>
            <option value="desc">Mayor Precio</option>
          </select>
          <div className={styles.contcards} style={{ width: "100%" }}>
            <ProductCards currentProducts={currentProducts} />
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            PRODUCTS={PRODUCTS.length}
            paginado={paginado}
          />
        </div>
      ) 
      ) : (
        <div className={styles.spinner}>
       <SpinnerCircularFixed size={250} thickness={90} speed={111} color="rgba(140, 82, 255, 1)" secondaryColor="rgba(74, 57, 172, 0.3)" />
        </div>
      )}
    </div>
  );
}
