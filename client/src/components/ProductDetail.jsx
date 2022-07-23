import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsDetail, setDetail } from "../actions";
import { useEffect } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import NavBar from "../components/NavBar";

import styles from "../styles/ProductDetail.module.css";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productsDetail);
  

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProductsDetail(id));

    return () => {
      dispatch(setDetail());
    };
  }, [dispatch, id]);

  return (
    <div>

      <NavBar />
      {Object.entries(product).length > 0? (
        <div className={styles.contAll}>
          <div className={styles.contDetail}>
            <img src={product.image} />
            <h1>{product.name}</h1>
            <h2>STOCK: {product.stock}</h2>
            <h1>${product.price}</h1>
            <h4>PESO: {product.weight}</h4>
            <h4>Descripcion: {product.description}</h4>
            {/* <h1>by: {product.business? product.business: 'No tiene Empresa asociada'}</h1> */}
            {/* <h4>Categoria: {product.categories? product.categories[0].name : 'No tiene categoría'} </h4> */}
            <button>Agregar al Carrito</button>
            <button>Comprar</button>
            <Link to={"/persona"}>
              <button>Volver</button>
            </Link>
          </div>
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

    </div>
  );
};
