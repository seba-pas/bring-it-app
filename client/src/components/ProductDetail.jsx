import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsDetail, setDetail } from "../actions";
import { useEffect } from "react";
import { SpinnerCircularFixed } from "spinners-react";

import styles from "../styles/ProductDetail.module.css";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productsDetail);
  console.log(product);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProductsDetail(id));

    return () => {
      dispatch(setDetail());
    };
  }, [dispatch, id]);

  return (
    <div>
      
        <div>
          <h1>{product.name}</h1>
          <img src={product.image} />
          <h2>STOCK: {product.stock}</h2>
          <h1>${product.price}</h1>
          <h4>PESO: {product.weight}</h4>
          <h4>Descripcion: {product.description}</h4>
          <Link>{/* <h1>by: {product.business.businessName}</h1> */}</Link>
          {/* <h4>Email: {product.businessEmail}</h4> */}
          <h4>Categoria: {product.categories}</h4>
          <button>Agregar al Carrito</button>
          <button>Comprar</button>
        </div>
      )
    </div>
  );
};
