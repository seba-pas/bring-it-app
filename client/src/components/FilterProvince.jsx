import React from "react";
import styles from "../styles/HomePersonas.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
import { filterByBranchesProvince, getAllProducts, orderByPrice } from "../actions";
import { SpinnerCircularFixed } from "spinners-react";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FilterProvince() {
  const dispatch = useDispatch();
  const PRODUCTS = useSelector((state) => state.products)
  const BRANCHES = useSelector((state) => state.branches);
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
  }, [dispatch]);

    //funcion para ordenar los precios
    function handleSort(e) {
      e.preventDefault();
      setCurrentPage(1);
      dispatch(orderByPrice(e.target.value));
      setOrden(`Ordenado ${e.target.value}`);
    }


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
    
      <div>
          <NavBar />
        {PRODUCTS.length > 0 ? (
          PRODUCTS == "No se encontraron productos asociados" ? (
            <div>
              <h1>No se encontraron productos asociados</h1>
              <button onClick={(e) => handleClick(e)}>Volver</button>
            </div>
          ) : (
            <div className={styles.layout}>

            <div className={styles.containerS} >
              <h1>
                Estás viendo los productos por provincias
              </h1>
              <NavLink to="/persona">
                <button className={styles.boton}>Ver todos los productos</button>
              </NavLink>
                <select onChange={(e) => handleSort(e)}>
                Todos
                  <option value="Desordenado" hidden selected>
                    Ordenar por
                  </option>
                  <option value="asc">Menor Precio</option>
                  <option value="desc">Mayor Precio</option>
                </select>
              <select
                value={BRANCHES.businessbranches}
                onChange={(e) => handleFilterByBranchesProvinces(e)}
              >
                <option value="All">Todas</option>

                {BRANCHES.map((province) => {
                  return (
                    <option value={province.province} key={province.province}>
                      {province.province}
                    </option>
                  );
                })}
              </select>
              </div>
              <div className={styles.contcards} style={{ width: "100%" }}>
                <ProductCards currentProducts={currentProducts} />
              <Pagination
                productsPerPage={productsPerPage}
                PRODUCTS={PRODUCTS.length}
                paginado={paginado}
                />
              </div>
                </div>
          )
        ) : (
          <div className={styles.spinner}>
            <SpinnerCircularFixed
              size={250}
              thickness={100}
              speed={100}
              color="rgba(210, 105, 30, 1)"
              secondaryColor="rgba(210, 105, 30, 0.23)"
            />
          </div>
        )}
      </div>
  );
}