import React from "react";
import NavBar from "./NavBar";
import styles from "../styles/HomePersonas.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
import { getAllProducts } from "../actions";
import { SpinnerCircularFixed } from "spinners-react";

export default function HomePersonas() {
  const dispatch = useDispatch();
  const PRODUCTS = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(1);
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
  }, [dispatch]);

  //funcion para volver a cargar los productos
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllProducts());
    setCurrentPage(1);
  }

  return (
    <div>
      <NavBar />

      {/* <button onClick={(e) => handleClick(e)}>Volver</button> */}

      {PRODUCTS.length > 0 ? (
        <div className={styles.containerCards}>
          <Pagination
            productsPerPage={productsPerPage}
            PRODUCTS={PRODUCTS.length}
            paginado={paginado}
          />
          <ProductCards currentProducts={PRODUCTS} />
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
