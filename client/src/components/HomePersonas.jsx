import React from "react";
import NavBar from "./NavBar";
import styles from "../styles/HomePersonas.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";

import { SpinnerCircularFixed } from "spinners-react";

import {
  getAllProducts,
  orderByPrice,
  filterByCategory,
  getCategories,
  getAllBusiness,
  filterByBusiness
} from "../actions";


export default function HomePersonas() {
  const dispatch = useDispatch();
  const PRODUCTS = useSelector((state) => state.products);
  const BUSINESS = useSelector((state) => state.business2);
  const CATEGORY = useSelector((state => state.categories))
  const [orden, setOrden] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
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
    dispatch(getCategories());
    dispatch(getAllBusiness());
  }, [dispatch]);

  //funcion para volver a cargar los productos
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllProducts());
    setCurrentPage(1);
  }

  //funcion para ordenar los precios
  function handleSort(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByPrice(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //funcion para filtrar por precios
  function handleFilterByCategory(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByCategory(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //funcion para filtrar por empresas
  function handleFilterByBusiness(e){
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByBusiness(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <NavBar />

     

      {PRODUCTS.length > 0 ? (
        <div className={styles.containerCards}>
          <Pagination
            productsPerPage={productsPerPage}
            PRODUCTS={currentProducts.length}
            paginado={paginado}
          />


          <div className={styles.containerS}>
            <select onChange={(e) => handleSort(e)}>
              <option hidden value="Precios">
                Precios
              </option>
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </select>
          
            <select onChange={(e) => handleFilterByCategory(e)}>
              <option value="All">Todas</option>
              {CATEGORY.map((CATEGORY) => (
                <option value={CATEGORY.name} key={CATEGORY.id}>
                  {CATEGORY.name}
                </option>
              ))}
            </select>
            
            <select onChange={(e) => handleFilterByBusiness(e)}>
              <option value="All">Todas</option>
              {/* {console.log(BUSINESS)} */}
              {BUSINESS.map((BUSINESS) => {
                return(
                <option value={BUSINESS.businessName} key={BUSINESS.email}>
                  {BUSINESS.businessName}
                  {/* {console.log(BUSINESS.businessName)} */}
                </option>
                  
                )
              })}
              </select>
          </div>

          <ProductCards currentProducts={currentProducts} />
        </div>
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={150}
            thickness={100}
            speed={100}
            color="rgba(65, 212, 207, 1)"
            secondaryColor="rgba(0, 0, 0, 1)"
          />
        </div>
      )}

      {/* <div className={styles.encabezado}>
        <h1>Bienvenido a Bring-It</h1>
        <h2>Seccion Personas</h2>
        <h3>
          Chamuyo: en bringit te traemos los productos que blablabla "qui
          dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed
          quia non numquam eius modi tempora incidunt, ut labore et dolore
          magnam aliquam quaerat voluptatem".
        </h3>
      </div>
      <div className={styles.carousel}></div> */}
      {/* <div className={styles.infopagos}>
        <p>
          Pagos seguros Tu pago está protegido y nunca será entregado al viajero
          hasta que confirmes la entrega.
        </p>
        <p>
          Entrega garantizada Estás protegido de principio a fin. Recibe tu
          pedido según lo acordado o recupera el 100% de tu dinero.
        </p>
        <p>
          Atención al cliente las 24 horas Atención al cliente en tu idioma,
          dentro de las 24 horas.
        </p>
      </div> */}
    </div>
  );
}
