import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsDetail, setDetail, addToCart } from "../actions";
import { useEffect } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import NavBar from "../components/NavBar";

import styles from "../styles/ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.css";

import Cart from "./Cart";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productsDetail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProductsDetail(id)); //component did mount
    return () => {
      dispatch(setDetail());
    };
  }, [dispatch, id]);
  function handleClick(e) {
    e.preventDefault();
    alert("PROXIMAMENTE!!!...");
  }

  function handleClickAddToCart (e){
    e.preventDefault();
    dispatch(addToCart(product));
  }

 
  return (
    <div>
      <NavBar />

      {Object.entries(product).length > 0 ? (
        <div className={styles.cont}>
          <div className="card" id={styles.card} style={{ width: "40%" }}>
            <img
              style={{ objectFit: "cover" }}
              className="card-img-top"
              src={product.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title" id={styles.name}>
                {product.name}
              </h5>
              <h5 className="card-title" id={styles.price}>
                ${product.price}
              </h5>
              <p className="card-text" id={styles.description}>
                {product.description}
              </p>
              <p className="card-text" id={styles.categories}>
                <span id={styles.bold}>Categorias: </span>
                {product.categories === null ||
                product.categories === undefined ||
                product.categories.length == 0
                  ? "No tiene categoría"
                  : product.categories[0].name}
              </p>
              <p className="card-text">
                <span id={styles.bold}>Empresa: </span>
                {product.business === null ||
                product.categories === undefined ||
                product.business.length == 0
                  ? "No tiene Empresa asociada"
                  : product.business.businessName}
              </p>
              <p className="card-text" id={styles.stock}>
                {" "}
                <span id={styles.bold}>Disponibles: </span>
                {product.stock}
              </p>
              <div className={styles.contBot}>
                <a
                  className="btn btn-primary"
                  onClick={(e) => handleClick(e)}
                  id={styles.boton}
                >
                  COMPRAR
                </a>
                
                <a
                  className="btn btn-primary"
                  // onClick={(e) => handleClick(e)}
                  onClick={(e) => handleClickAddToCart(e)}
                  id={styles.boton}
                >
                  AGREGAR AL CARRITO
                </a>
                
                <Link to={"/persona"}>
                  <a className="btn btn-primary" id={styles.boton}>
                    VOLVER
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <Cart/>          
        </div>


      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={250}
            thickness={100}
            speed={100}
            color="rgba(58, 176, 255, 1)"
            secondaryColor="rgba(58, 176, 255, 0.23)"
          />
        </div>
      )}
    </div>
  );
};
