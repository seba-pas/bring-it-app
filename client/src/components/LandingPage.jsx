import React from "react";
import style from "../styles/LandingPage1.module.css";
import NavBarLanding from "./NavBarLanding";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import imagen from "./img/unboxing.jpg";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActiveUser } from "../actions";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import '../styles/Swal.module.css'

function LandingPage1() {
  const user = useSelector((state) => state.user);
  const business = useSelector((state) => state.business);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getActiveUser());
    if(!user){
      user = 'clean'
    }
    // console.log(user, business);
  }, [dispatch]);

  function handleComprar(e) {
    e.preventDefault();

    if (user == "clean" && business == "clean") {
      swal("No estás logueado", "Por favor logueate para ingresar", "error");
    } else if (user == "clean" && business !== "clean") {
      swal(
        "Estás logueado como empresa",
        "Por favor logueate como usuario para comprar",
        "warning"
      );
    } else {
      history.push("/persona/filtro");
    }
  }

  return (
    <div style={{ backgroundColor: "white", height: "70vh" }}>
      <NavBarLanding />
      <div>
        <div className={style.divContainer}>
          <div className={style.info}>
            <h1  style={{fontSize: "40px", marginBottom: '20px'}}>Compra con Bring It de manera simple, fácil y segura</h1>
            <span>
              Consigue productos de tus tiendas de todo el pais y entregados por
              viajeros a tu ciudad.
            </span>
            <div className={style.containerButton}>
              <Button onClick={(e) => handleComprar(e)} id={style.boton}>
                COMPRAR
              </Button>

              <Link to={"/conocemas"}>
                <Button id={style.boton}>CONOCE MÁS</Button>
              </Link>
              <Link to={"/vidriera"}>
                <Button id={style.boton}>VER PRODUCTOS</Button>
              </Link>
            </div>
          </div>
          <div className={style.photos} style={{ height: "70vh" }}>
            <img src={imagen} className={style.img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage1;
