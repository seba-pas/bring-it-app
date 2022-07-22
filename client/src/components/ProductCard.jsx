
import React from "react";
import imagen from "./img/iphone.jpg";
import styles from "../styles/ProductCard.module.css";
// import { Link } from "react-router-dom";

export default function ProductCard({name, description, image, price, empresa, province}) {
  
  return (
    <div className={styles.container}>
      {/* <Link style={{textDecoration:'none'}} to={`products/${id}`} > */}
      <img
        className={styles.imagen}
        src={image}
        alt="no pudo cargarse la imagen"
      />
      <div className={styles.containertext}>
        <h3 className={styles.name}>{name}</h3>
        <h1 className={styles.price}>${price}</h1>
        <p className={styles.description}>{description}</p>
        <a className={styles.empresa}>
          by {empresa} <br />({province})
        </a>
      </div>

      {/* </Link> */}
    </div>
  );
}

