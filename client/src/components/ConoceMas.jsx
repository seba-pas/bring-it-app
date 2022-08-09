import { React, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NavBarLanding from "./NavBarLanding.jsx";
import style from "../styles/LandingPage.module.css";
import Footer from "./Footer.jsx";

// import Paso1 from "./img/paso1.jpg";
// import Paso2 from "./img/paso2.jpg";
// import Paso3 from "./img/paso3.jpg";
// import Paso4 from "./img/paso4.jpg";
// import Paso5 from "./img/paso5.jpg";
// import Paso6 from "./img/paso6.jpg";
// import Paso7 from "./img/paso7.jpg";
// import Paso8 from "./img/paso8.jpg";

export default function ConoceMas() {
  const [key, setKey] = useState("home");
  return (
    <div style={{ backgroundColor: "white" }}>
      <NavBarLanding />
      <div className={style.comoFunciona} style={{ marginTop: "60px" }}>
        <h1 style={{ marginBottom: "40px", fontSize: '40px' }}>¿Cómo funciona Bring It?</h1>
        <div className={style.tabs}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="home" title="Para compradores">
              <h3>
                Bring It es la mejor manera de comprar productos que no están
                disponibles o son muy caros en tu ciudad. Puedes pedir desde
                ropa, juguetes, dispositivos electrónicos, suplementos
                nutricionales, hasta alfajores cordobeces, puedes comprar casi
                cualquier cosa.
              </h3>
              <div className={style.pasos}>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>1 - Consulta acerca del producto que quieras </h2>
                      <span>
                        Con Bring It, puedes conseguir el producto que sea, de
                        cualquier parte del pais. Para empezar, crea un pedido
                        con el producto que quieras y añade el detalle de cuánto
                        cuesta y en qué sitio puede comprarlo el viajero.
                      </span>
                    </div>
                  </div>
                  {/* <img
                    src={Paso1}
                    id={style.ph}
                    className={style.imgPaso1}
                    alt=""
                  /> */}
                </div>
              </div>
              <div className={style.pasoPorPasos}>
                <div className={style.pasoPorInfo}>
                  <div className={style.paso1}>
                    <h2>2 - Espera ofertas de entrega de los viajeros</h2>
                    <span>
                      Una vez publiques tu pedido, lo compartiremos con toda
                      nuestra comunidad de viajeros. Luego, espera las ofertas
                      de los viajeros que estén viajando hacia tu ciudad para
                      entregar tu producto.
                    </span>
                  </div>
                </div>

                {/* <img
                  src={Paso2}
                  id={style.ph}
                  className={style.imgPaso1}
                  alt=""
                /> */}
              </div>
              <div className={style.pasoPorPasos}>
                <div className={style.pasoPorInfo}>
                  <div className={style.paso1}>
                    <h2>3 - Elige el viajero con la oferta que mas te convenga.</h2>
                    <span>
                      Podras ver las ofertas, el perfil del viajero, la
                      puntuacion y la calificacion de compradores anteriores asi
                      poder elegir con total seguridad.
                    </span>
                  </div>
                </div>

                {/* <img
                  src={Paso3}
                  id={style.ph}
                  className={style.imgPaso1}
                  alt=""
                /> */}
              </div>
              <div className={style.pasoPorPasos}>
                <div className={style.pasoPorInfo}>
                  <div className={style.paso1}>
                    <h2>4 - Coordina con tu viajero y recibe tu producto </h2>
                    <span>
                      Chatea directamente con el viajero, Coordina una hora y
                      lugar para la entrega con tu viajero. Cuando recibas tu
                      artículo, asegúrate de confirmar la entrega para que tu
                      viajero reciba el pago.
                    </span>
                  </div>
                </div>
{/* 
                <img
                  src={Paso4}
                  id={style.ph}
                  className={style.imgPaso1}
                  alt=""
                /> */}
              </div>
            </Tab>

            <Tab eventKey="profile" title="Viajeros">
              <h3>
                Financia tu viaje cada vez que viajes con Bring It. Nuestros
                viajeros normalmente entregan un puñado de artículos y ganan más
                de $300 por viaje. No solo ganarás dinero viajando, conocerás
                gente increíble por el camino.
              </h3>
              <div className={style.pasos}>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>
                        1 - Encuentra un pedido que puedas entregar y haz una
                        oferta.{" "}
                      </h2>
                      <span>
                        Busca pedidos en función de tu próximo destino. Haz una
                        oferta y establece tu recompensa - la cantidad de dinero
                        que tu comprador te pagará por entregar su artículo.
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso5} className={style.imgPaso1} alt="" /> */}
                </div>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>
                        2 - Confirma los detalles del pedido con tu comprador.
                      </h2>
                      <span>
                        Utiliza el messenger de Bring It para confirmar con tu
                        comprador detalles como el tamaño o el color del pedido.
                        También puedes preguntar si hay otros artículos que les
                        gustaría recibir
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso6} className={style.imgPaso1} alt="" /> */}
                </div>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>3 - Compra el artículo con tu propio dinero.</h2>
                      <span>
                        De esta forma, sabrás exactamente lo que llevas. Tras la
                        entrega, recibirás un reembolso por el precio del
                        artículo y el pago de tu recompensa.
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso7} className={style.imgPaso1} alt="" /> */}
                </div>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>
                        4 - Entrega el pedido de tu comprador y recibe el pago
                      </h2>
                      <span>
                        Coordina una hora y lugar público para encontrarte con
                        tu comprador. Una vez tu comprador confirme que ha
                        recibido el pedido, transferiremos el pago a tu cuenta.
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso8} className={style.imgPaso1} alt="" /> */}
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile1" title="Empresas">
              <h3>
                Cada vez que viajes con Bring It gana dinero y solventa costos.
                Nuestros viajeros normalmente entregan un puñado de artículos y
                ganan más de AR$ 20000 . No solo ganarás dinero viajando,
                conocerás gente increible por todo el pais.
              </h3>
              <div className={style.pasos}>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>1 - Encuentra compradores y haz una oferta. </h2>
                      <span>
                        En función de tu próximo destino encuentra pedidos. Haz
                        una oferta y establece la cantidad de dinero que tu
                        comprador te pagará por entregar su artículo.
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso5} className={style.imgPaso1} alt="" /> */}
                </div>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>
                        2 - Confirma los detalles del pedido con tu comprador.
                      </h2>
                      <span>
                        Con el chat de Bring It puedes confirmar con tu
                        comprador detalles como el tamaño o el color del pedido,
                        coordinar los detalles de entrega. También puedes
                        preguntar si hay otros artículos que les gustaría
                        recibir
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso6} className={style.imgPaso1} alt="" /> */}
                </div>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>3 - Compra el artículo con tu propio dinero.</h2>
                      <span>
                        Tras la entrega, recibirás un reembolso por el precio
                        del artículo mas el pago de tu recompensa. De esta forma
                        hacemos que Bring It sea mas seguro para el comprador y
                        para el viajero.
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso7} className={style.imgPaso1} alt="" /> */}
                </div>
                <div className={style.pasoPorPasos}>
                  <div className={style.pasoPorInfo}>
                    <div className={style.paso1}>
                      <h2>
                        4 - Entrega el pedido de tu comprador y recibe el pago
                      </h2>
                      <span>
                        Coordina los detalles de entrega con tu comprador. Una
                        vez tu comprador confirme que ha recibido el pedido,
                        transferiremos el pago a tu cuenta.
                      </span>
                    </div>
                  </div>

                  {/* <img src={Paso8} className={style.imgPaso1} alt="" /> */}
                </div>
              </div>
            </Tab>
          </Tabs>
          <div className={style.botonAhora}>
            <Link to = '/'>
            <Button id={style.boton} type="submit">
              Atrás
            </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
