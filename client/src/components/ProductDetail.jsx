import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsDetail,
  setDetail,
  addToCart,
  getCart,
} from "../actions";
import { useEffect } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import NavBar from "../components/NavBar";
import swal from "sweetalert";
import styles from "../styles/ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.css";

export const ProductDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productsDetail);
  const cart = useSelector((state) => state.cart);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProductsDetail(id));
    //component did mount
    return () => {
      dispatch(setDetail());
    };
  }, [dispatch, id]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   history.go("/compra")
  // }
  function handleClickAddToCart(e) {
    e.preventDefault();
    if (cart.length > 0) {
      if (cart[0].businessbranchId !== product.businessbranchId) {
        swal(
          "Este producto pertenece a otra empresa",
          "Podés agregarlo como favorito para comprarlo en tu proximo carrito!",
          "error"
        );
      } else {
        console.log(product.stock, 'soy product stock')
        console.log(cart[0].quantity);
        if(product.stock > cart[0].quantity){
          dispatch(addToCart(product));
          swal("Buen trabajo!", "El producto fue agregado con exito!", "success");
          return;
        }else{
          swal("No tenemos la cantidad solicitada", "Nuestro stock es menor a la cantidad que deseas", "error")
        }

        
      }
    } else {
      dispatch(addToCart(product));
      swal("Buen trabajo!", "El producto fue agregado con exito!", "success");
    }
  }

  return (
    <div style={{ marginBottom: "0px", background: "white" }}>
      <NavBar />

      {Object.entries(product).length > 0 ? (
        <div className={styles.cont}>
          <div className={styles.imgCon}>
            <img
              style={{ objectFit: "cover" }}
              className="card-img-top"
              src={product.image}
              alt="Card image cap"
            />
          </div>
          <div className="card" id={styles.card} style={{ width: "22%" }}>
            <div className="card-body">
              <p className="card-text" id={styles.empresa}>
                <span>Empresa: </span>

                {product.businessbranch.businessBranchName === null ||
                product.categories === undefined ||
                product.businessbranch.businessBranchName.length == 0
                  ? ""
                  : product.businessbranch.businessBranchName.split(" - ")[0]}
              </p>
              <h1 className="card-title" id={styles.name}>
                {product.name}
              </h1>
              <h1 className="card-title" id={styles.provincia}>
                Producto de:{" "}
                {product.businessbranch.businessBranchName.split(" - ")[1]}
              </h1>
              <p className="card-text" id={styles.empresa}>
                <span id={styles.categoria}>En: </span>
                {product.categories === null ||
                product.categories === undefined ||
                product.categories.length == 0
                  ? "No tiene categoría"
                  : product.categories[0].name}
              </p>
              <div className="card-title" id={styles.price}>
                <span>${product.price}.00</span>
              </div>
              <p className="card-text" id={styles.description}>
                {product.description}
              </p>

              <p className="card-text" id={styles.stock}>
                {" "}
                <span
                  id={styles.bold}
                  style={{
                    textAlign: "left",
                    marginLeft: "0",
                    marginTop: "10px",
                  }}
                >
                  Disponibles:{" "}
                </span>
                {product.stock}
              </p>
              <div className="card-footer">
                {/* <div className={styles.contBot}>
                  <a
                    className="btn btn-primary"
                    onClick={() => history.goBack()}
                    id={styles.boton}
                  >
                    COMPRAR
                  </a>
                </div> */}
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleClickAddToCart(e)}
                  id={styles.boton2}
                >
                  AGREGAR AL CARRITO
                </button>
                <a
                  className="btn btn-primary"
                  id={styles.boton2}
                  onClick={() => history.goBack()}
                >
                  VOLVER
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={250}
            thickness={100}
            speed={100}
            color="rgba(210, 105, 30, 1)"
            secondaryColor="rgba(210, 105, 30, 0.23)"
          />
        </div>
      )}
    </div>
  );
};
