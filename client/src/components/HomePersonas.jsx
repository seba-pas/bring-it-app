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
  filterByBusiness,
  filterByProvinces,
  getAllProvinces,
  filterByCities,
  filterByProvinceCity,
} from "../actions";

export default function HomePersonas() {
  const dispatch = useDispatch();
  const PRODUCTS = useSelector((state) => state.products);
  const BUSINESS = useSelector((state) => state.business2);
  const CATEGORY = useSelector((state) => state.categories);
  const CITIES = useSelector((state) => state.business2);
  const PROVINCES = useSelector((state) => state.uniqueProvinces);
  const stateCart = useSelector((state) => state.cart);

  const [orden, setOrden] = useState("");
  const [category, setCategory] = useState("All");
  const [business, setBusinnes] = useState("All");
  const [province, setProvince] = useState("All");

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
    dispatch(getCategories());
    dispatch(getAllBusiness());
    dispatch(getAllProvinces());
  }, [dispatch]);

  //funcion para volver a cargar los productos
  function handleClick(e) {
    e.preventDefault();
    setCategory("All");
    setBusinnes("All");
    setProvince("All");
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

  //funcion para filtrar por categorias
  function handleFilterByCategory(e) {
    e.preventDefault();
    setCategory(e.target.value);
    setCurrentPage(1);
    dispatch(filterByCategory(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //funcion para filtrar por empresas
  function handleFilterByBusiness(e) {
    e.preventDefault();
    setBusinnes(e.target.value);
    setCurrentPage(1);
    dispatch(filterByBusiness(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  //funcion para filtrar por provincias
  function handleFilterByProvinces(e) {
    e.preventDefault();
    setProvince(e.target.value);
    setCurrentPage(1);
    dispatch(filterByProvinces(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  //funcion para filtrar por ciduades
  function handleFilterByCities(e) {
    e.preventDefault();
    // setProvince(e.target.value);
    setCurrentPage(1);
    dispatch(filterByProvinceCity(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <NavBar />

      {PRODUCTS.length > 0 ? (
        PRODUCTS == "No se encontraron productos asociados" ? (
          <div>
            <h1>No se encontraron productos asociados</h1>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.containerS}>
              {/* <div> Ordenar por */}
              <select onChange={(e) => handleSort(e)}>
                {/* <span>Todos</span> */}
                {/* <option value="All">
                Todos
              </option> */}
                <option value="Desordenado" hidden selected>
                  Ordenar por
                </option>
                <option value="asc">Menor Precio</option>
                <option value="desc">Mayor Precio</option>
              </select>

              {/* </div> */}

              <select
                value={category}
                onChange={(e) => handleFilterByCategory(e)}
              >
                <option hidden selected>
                  Categorias
                </option>
                <option value="All">Todas</option>
                {CATEGORY.map((CATEGORY) => {
                  return (
                    <option value={CATEGORY.name} key={CATEGORY.id}>
                      {CATEGORY.name}
                    </option>
                  );
                })}
              </select>

              <select
                value={business}
                onChange={(e) => handleFilterByBusiness(e)}
              >
                <option value="All">Todas</option>
                <option hidden selected>
                  Empresa
                </option>
                {BUSINESS.map((BUSINESS) => {
                  return (
                    <option value={BUSINESS.businessName} key={BUSINESS.email}>
                      {BUSINESS.businessName}
                    </option>
                  );
                })}
              </select>
              <select
                value={province}
                onChange={(e) => handleFilterByProvinces(e)}
              >
                <option value="All">Todas</option>

                {PROVINCES.map((province) => {
                  return (
                    <option value={province} key={province}>
                      {province}
                    </option>
                  );
                })}
              </select>
              <button
                className={styles.botonvol}
                onClick={(e) => handleClick(e)}
              >
                Limpiar Filtros
              </button>
            </div>
            <div className={styles.contcards}>
              <ProductCards currentProducts={currentProducts} />
            </div>
            {/* <Pagination
              productsPerPage={productsPerPage}
              PRODUCTS={PRODUCTS.length}
              paginado={paginado}
            /> */}
          </div>
        )
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={250}
            thickness={100}
            speed={100}
            color="rgba(210, 105, 30, 1)" secondaryColor="rgba(210, 105, 30, 0.23)" 
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
