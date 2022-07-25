import React from "react";
// import styles from "../styles/ProductCard.module.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../styles/ProductCard.module.css";

export default function ProductCard({
  name,
  description,
  image,
  price,
  businessName,
  categories,
  id,
}) {
  return (
    <div
      className="card"
      id={styles.card}
      style={{ padding: "0", margin: "20px", width: "20%", height: "auto" }}
    >
      <img
        className="card-img-top"
        style={{ objectFit: "cover" }}
        src={image}
        alt="no pudo cargarse la imagen"
      />
      <div className="card-body">
        <h5 className="card-title" id={styles.name}>
          {name}
        </h5>
        <h5 className="card-title" id={styles.price}>
          ${price}
        </h5>
        <p className="card-text" id={styles.description}>
          
          {description}
        </p>
        <p>
          <span className={styles.bold}>Categorias:{"   "}</span>
          {Array.isArray(categories)
            ? categories.map((e) => e.name + "  ")
            : "No tiene categoria"}
        </p>
      </div>
      <a
        href={`product/${id}`}
        className="btn btn-primary stretched-link"
        id={styles.boton}
      >
        Ver Producto
      </a>
      <div className="card-footer">
       <small> Empresa:{" "}</small>
        <small className="text-muted" id={styles.bold}>
          {businessName ? businessName : "No esta asociado a una empresa"}
        </small>
      </div>
    </div>
  );
}
