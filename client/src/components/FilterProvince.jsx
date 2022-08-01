import React from "react";
import styles from "../styles/HomePersonas.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
import { filterByBranchesProvince, getAllProducts, setProduct } from "../actions";
import { SpinnerCircularFixed } from "spinners-react";
import NavBarProvince from "./NavBarProvince";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FilterProvince() {
  const dispatch = useDispatch();
  const PRODUCTS = useSelector((state) => state.products);
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
    return() => {
        dispatch(setProduct())
    }
  }, [dispatch]);


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
          <NavBarProvince />
        {PRODUCTS.length > 0 ? (
          PRODUCTS == "No se encontraron productos asociados" ? (
            <div>
              <h1>No se encontraron productos asociados</h1>
              <button onClick={(e) => handleClick(e)}>Volver</button>
            </div>
          ) : (
            <div>
              <select
                value={BRANCHES.businessbranches}
                onChange={(e) => handleFilterByBranchesProvinces(e)}
                style={{color: 'white', marginTop: '33px', backgroundColor: 'chocolate'}}
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
