import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsDetail, setDetail } from "../actions";
import { useEffect } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import NavBar from "../components/NavBar";

import styles from "../styles/ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.css";

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
  console.log(product.categories)
  console.log(product.business)
  return (
    <div>

      <NavBar />
     
      
      {Object.entries(product).length > 0 ? (
        <div className={styles.cont}>
          <div className="card" style={{ width: "40%" }}>
            <img
              className="card-img-top"
              src={product.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <h5 className="card-title">${product.price}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.categories === null || product.categories === undefined || product.categories.length == 0?  'No tiene categoría': product.categories[0].name }</p>
              <p className="card-text">{product.business === null || product.categories === undefined || product.business.length == 0? 'No tiene Empresa asociada': product.business.businessName}</p>
              <p className="card-text">Disponibles: {product.stock}</p>
              <div className={styles.contBot}>
                <Link to={"/persona"}>
                  <a className="btn btn-primary">volver</a>
                </Link>
                <a className="btn btn-primary">agregar al carrito</a>
                <a className="btn btn-primary">comprar</a>
              </div>
            </div>
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
