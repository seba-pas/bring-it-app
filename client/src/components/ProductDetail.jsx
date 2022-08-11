import { React, useEffect, useState } from "react";
import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsDetail,
  setDetail,
  addToCart,
  getCart,
} from "../actions";
import { SpinnerCircularFixed } from "spinners-react";
import NavBar from "../components/NavBar";
import swal from "sweetalert";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "../styles/ProductDetail.module.css";
import "bootstrap/dist/css/bootstrap.css";
import AddFavourites from "./AddFavourites";
import Reviews from "./Reviews";
import Modal from "react-bootstrap/Modal";

export const ProductDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productsDetail);
  const cart = useSelector((state) => state.cart);
  const { id } = useParams();
  // const navigate = useNavigate();
  const [review, setReview] = useState(false);

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
        if (cart.filter((e) => e.id === product.id).length > 0) {
          if (cart[0].quantity < product.stock) {
            dispatch(addToCart(product));

            swal(
              "Buen trabajo!",
              "El producto fue agregado con éxito!",
              "success"
            );
            return;
          } else {
            swal(
              "No tenemos más stock",
              "Acabamos de enviar un Email a la empresa correspondiente",
              "error"
            );
            return;
          }
        } else {
          dispatch(addToCart(product));
          swal(
            "Buen trabajo!",
            "El producto fue agregado con éxito!",
            "success"
          );
          return;
        }
      }
    } else {
      dispatch(addToCart(product));
      swal("Buen trabajo!", "El producto fue agregado con éxito!", "success");
    }
    dispatch(getCart());
  }
  const handleCloseReview = () => setReview(false);
  const handleShowReview = () => setReview(true);

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
                Agregar a mis Favoritos: <AddFavourites />
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleClickAddToCart(e)}
                  id={styles.boton2}
                >
                  AGREGAR AL CARRITO
                </button>
                <button
                  className="btn btn-primary"
                  id={styles.boton2}
                  onClick={handleShowReview}
                >
                  REVIEWS
                </button>
                <a
                  className="btn btn-primary"
                  id={styles.boton2}
                  onClick={() => history.goBack(dispatch(getCart()))}
                >
                  VOLVER
                </a>

              </div>
            </div>
          </div>
          <div>
            <Modal show={review} onHide={handleCloseReview}>
              <Modal.Header closeButton>
                <Modal.Title>REVIEWS</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Reviews />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleCloseReview}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size={250}
            thickness={90}
            speed={111}
            color="rgba(140, 82, 255, 1)"
            secondaryColor="rgba(74, 57, 172, 0.3)"
          />
        </div>
      )}
    </div>
  );
};