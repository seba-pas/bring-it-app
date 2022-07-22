import React from "react";
import NavBar from "./NavBar";
import styles from "../styles/HomePersonas.module.css";
import ProductCards from "./ProductCards";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../actions";

export default function HomePersonas() {

const PRODUCTS = useSelector((state) => state.products)
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getAllProducts())

}, [dispatch])

  return (
    <div>
      <NavBar />

      <div className={styles.encabezado}>
        <h1>Bienvenido a Bring-It</h1>
        <h2>Seccion Personas</h2>
        <h3>
          Chamuyo: en bringit te traemos los productos que blablabla "qui
          dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed
          quia non numquam eius modi tempora incidunt, ut labore et dolore
          magnam aliquam quaerat voluptatem".
        </h3>
      </div>
      <div className={styles.cardsDiv}>
        <ProductCards products={PRODUCTS} />
      </div>
      <div className={styles.infopagos}>
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
      </div>
    </div>
  );
}
