import React from "react";
import Button from "react-bootstrap/Button";
import NavBarLanding from "./NavBarLanding.jsx";
import style from "../styles/LandingPage.module.css";
import Imagen from "./img/imgMuestra.jpg";
import Product1 from "./img/product1.jpeg";
import Product2 from "./img/product2.jpeg";
import Product3 from "./img/product3.jpeg";
import Paso1 from "./img/paso1.jpg";
import Paso2 from "./img/paso2.jpg";
import Paso3 from "./img/paso3.jpg";
import Paso4 from "./img/paso4.jpg";

export default function LandingPage() {
  return (
    <div>
      <NavBarLanding />
      <div>
        <div className={style.divContainer}>
          <div className={style.info}>
            <h1>Compra con Bring It de manera simple, fácil y segura</h1>
            <span>
              Consigue esos productos que siempre quisiste, al precio más bajo y
              entregados por viajeros a tu ciudad.
            </span>
            <div className={style.containerButton}>
              <Button variant="outline-primary" type="submit">
                Comprar
              </Button>
              <Button variant="outline-primary" type="submit">
                Viajar
              </Button>
            </div>
          </div>
          <div className={style.photos}>
            <img src={Imagen} className={style.img} alt="" />
          </div>
        </div>

        <div className={style.productosEntregados}>
          <h1>Productos entregados recientemente</h1>
          <span>
            Estos pedidos fueron entregados recientemente al otro lado del
            mundo. De forma segura, rápida y barata
          </span>
          <div className={style.imgProduct}>
            <img src={Product1} className={style.imagenesProductos} alt="" />
            <img src={Product2} className={style.imagenesProductos} alt="" />
            <img src={Product3} className={style.imagenesProductos} alt="" />
          </div>
        </div>
        <div className={style.comoFunciona}>
          <h1>Cómo funciona Bring It</h1>

          <span style={{ marginRight: "25px" }}>Para comprador</span>
          <span>Para viajero</span>

          <h3>
            Grabr es la mejor manera de comprar productos que no están
            disponibles o son muy caros en tu país. Puedes pedir prácticamente
            cualquier cosa con Grabr, desde ropa de bebé y juguetes hasta
            dispositivos electrónicos y suplementos nutricionales.
          </h3>
          <div className={style.pasos}>
            <div className={style.pasoPorPasos}>
              <div className={style.pasoPorInfo}>
                <h1>1</h1>
                <div className={style.paso1}>
                  <h2>Cuéntanos acerca del producto que estás buscando </h2>
                  <span>
                    Con Grabr, puedes conseguir el producto que sea, de
                    cualquier parte del mundo. Para empezar, crea un pedido con
                    el producto que quieras y añade el detalle de cuánto cuesta
                    y en qué sitio puede comprarlo el viajero.
                  </span>
                </div>
              </div>
              <div className={style.pasoPorPhoto}>
                <img src={Paso1} className={style.imgPaso1} alt="" />
              </div>
            </div>
            <div className={style.pasoPorPasos}>
              <div className={style.pasoPorInfo}>
                <h1>2</h1>
                <div className={style.paso1}>
                  <h2>Cuéntanos acerca del producto que estás buscando </h2>
                  <span>
                    Con Grabr, puedes conseguir el producto que sea, de
                    cualquier parte del mundo. Para empezar, crea un pedido con
                    el producto que quieras y añade el detalle de cuánto cuesta
                    y en qué sitio puede comprarlo el viajero.
                  </span>
                </div>
              </div>
              <div className={style.pasoPorPhoto}>
                <img src={Paso2} className={style.imgPaso1} alt="" />
              </div>
            </div>
            <div className={style.pasoPorPasos}>
              <div className={style.pasoPorInfo}>
                <h1>3</h1>
                <div className={style.paso1}>
                  <h2>Cuéntanos acerca del producto que estás buscando </h2>
                  <span>
                    Con Grabr, puedes conseguir el producto que sea, de
                    cualquier parte del mundo. Para empezar, crea un pedido con
                    el producto que quieras y añade el detalle de cuánto cuesta
                    y en qué sitio puede comprarlo el viajero.
                  </span>
                </div>
              </div>
              <div className={style.pasoPorPhoto}>
                <img src={Paso3} className={style.imgPaso1} alt="" />
              </div>
            </div>
            <div className={style.pasoPorPasos}>
              <div className={style.pasoPorInfo}>
                <h1>4</h1>
                <div className={style.paso1}>
                  <h2>Cuéntanos acerca del producto que estás buscando </h2>
                  <span>
                    Con Grabr, puedes conseguir el producto que sea, de
                    cualquier parte del mundo. Para empezar, crea un pedido con
                    el producto que quieras y añade el detalle de cuánto cuesta
                    y en qué sitio puede comprarlo el viajero.
                  </span>
                </div>
              </div>
              <div className={style.pasoPorPhoto}>
                <img src={Paso4} className={style.imgPaso1} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
