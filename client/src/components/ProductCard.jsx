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
  empresa,
  province,
  id,
}) {
  return (

    <div className={styles.container}>
      <Link style={{ textDecoration: "none" }} to={`product/${id}`}>
        <img
          className={styles.imagen}
          src={image}
          alt="no pudo cargarse la imagen"
        />
        <div className={styles.containertext}>
          <h3 className={styles.name}>{name}</h3>
          <h1 className={styles.price}>${price}</h1>
          <p className={styles.description}>{description}</p>
          <p className={styles.empresa}>
            by {empresa} <br />({province})
          </p>
        </div>
      </Link>


    <div
      className="card" id={styles.card}
      style={{ padding: "0", margin: "20px", width: "20%", height: "auto" }}
    >
      <img
        className="card-img-top"
        style={{ objectFit: "cover" }}
        src={image}
        alt="no pudo cargarse la imagen"
      />
      <div className="card-body">
        <h5 className="card-title" id={styles.name}>{name}</h5>
        <h5 className="card-title" id={styles.price}>${price}</h5>
        <p className="card-text" id={styles.descrpition}>{description}</p>
        <a
          href={`product/${id}`}
          className="btn btn-primary stretched-link"
          id={styles.boton}
        >
          Ver Producto
        </a>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          Empresa:
          {business}
        </small>
      </div>
    </div>
    
  );
}

//   return (
//     <div className={styles.container}>
//       <Link style={{ textDecoration: "none" }} to={`product/${id}`}>
//         <img
//           className={styles.imagen}
//           src={image}
//           alt="no pudo cargarse la imagen"
//         />
//         <div className={styles.containertext}>
//           <h3 className={styles.name}>{name}</h3>
//           <h1 className={styles.price}>${price}</h1>
//           <p className={styles.description}>{description}</p>
//           <footer>

//           <p className={styles.empresa}>
//             by {business}
//           </p>
//           </footer>
//         </div>
//       </Link>

//     </div>
//   );
// }
