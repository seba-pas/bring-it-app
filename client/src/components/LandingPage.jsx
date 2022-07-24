import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
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
import Paso5 from "./img/paso5.jpg";
import Paso6 from "./img/paso6.jpg";
import Paso7 from "./img/paso7.jpg";
import Paso8 from "./img/paso8.jpg";

export default function LandingPage() {
  const [key, setKey] = useState("home");
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
          <div className={style.tabs}>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
              justify
            >
              <Tab eventKey="home" title="Compradores">
                <h3>
                  Grabr es la mejor manera de comprar productos que no están
                  disponibles o son muy caros en tu país. Puedes pedir
                  prácticamente cualquier cosa con Grabr, desde ropa de bebé y
                  juguetes hasta dispositivos electrónicos y suplementos
                  nutricionales.
                </h3>
                <div className={style.pasos}>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <div className={style.number}>1</div>
                      <div className={style.paso1}> 
                        <div >
                          Cuéntanos acerca del producto que estás buscando{" "}
                        </div>
                        <div>
                          Con Grabr, puedes conseguir el producto que sea, de
                          cualquier parte del mundo. Para empezar, crea un
                          pedido con el producto que quieras y añade el detalle
                          de cuánto cuesta y en qué sitio puede comprarlo el
                          viajero.
                        </div>
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
                        <h2>
                          Espera a que los viajeros hagan ofertas de entrega
                        </h2>
                        <span>
                          Una vez publiques tu pedido, lo compartiremos con toda
                          nuestra comunidad de viajeros. Luego, los viajeros que
                          estén viajando hacia tu ciudad harán sus ofertas para
                          entregar tu producto.
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
                        <h2>
                          Acordar una recompensa monetaria para tu viajero.
                        </h2>
                        <span>
                          Grabr calcula automáticamente las tasas e impuestos
                          aplicables, incluyendo la recompensa que aceptas pagar
                          a tu viajero por entregar tu artículo. Si tu viajero
                          no entrega el pedido por la razón que sea, recibirás
                          un reembolso completo.
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
                        <h2>
                          Encuéntrate con tu viajero y recibe tu artículo{" "}
                        </h2>
                        <span>
                          Coordina una hora y lugar público para el encuentro
                          con tu viajero. Cuando recibas tu artículo, asegúrate
                          de confirmar la entrega para que tu viajero reciba el
                          pago.
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso4} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Viajeros">
                <h3>
                  Financia tu viaje cada vez que viajes con Grabr. Nuestros
                  viajeros normalmente entregan un puñado de artículos y ganan
                  más de $300 por viaje. No solo ganarás dinero viajando,
                  conocerás gente increíble por el camino.
                </h3>
                <div className={style.pasos}>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>1</h1>
                      <div className={style.paso1}>
                        <h2>
                          Encuentra un pedido que puedas entregar y haz una
                          oferta.{" "}
                        </h2>
                        <span>
                          Busca pedidos en función de tu próximo destino. Haz
                          una oferta y establece tu recompensa - la cantidad de
                          dinero que tu comprador te pagará por entregar su
                          artículo.
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso5} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>2</h1>
                      <div className={style.paso1}>
                        <h2>
                          Confirma los detalles del pedido con tu comprador.
                        </h2>
                        <span>
                          Utiliza el messenger de Grabr para confirmar con tu
                          comprador detalles como el tamaño o el color del
                          pedido. También puedes preguntar si hay otros
                          artículos que les gustaría recibir
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso6} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>3</h1>
                      <div className={style.paso1}>
                        <h2>Compra el artículo con tu propio dinero.</h2>
                        <span>
                          De esta forma, sabrás exactamente lo que llevas. Tras
                          la entrega, recibirás un reembolso por el precio del
                          artículo y el pago de tu recompensa.
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso7} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>4</h1>
                      <div className={style.paso1}>
                        <h2>
                          Entrega el pedido de tu comprador y recibe el pago
                        </h2>
                        <span>
                          Coordina una hora y lugar público para encontrarte con
                          tu comprador. Una vez tu comprador confirme que ha
                          recibido el pedido, transferiremos el pago a tu
                          cuenta.
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso8} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile1" title="Empresas">
                <h3>
                  Financia tu viaje cada vez que viajes con Grabr. Nuestros
                  viajeros normalmente entregan un puñado de artículos y ganan
                  más de $300 por viaje. No solo ganarás dinero viajando,
                  conocerás gente increíble por el camino.
                </h3>
                <div className={style.pasos}>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>1</h1>
                      <div className={style.paso1}>
                        <h2>
                          Encuentra un pedido que puedas entregar y haz una
                          oferta.{" "}
                        </h2>
                        <span>
                          Busca pedidos en función de tu próximo destino. Haz
                          una oferta y establece tu recompensa - la cantidad de
                          dinero que tu comprador te pagará por entregar su
                          artículo.
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso5} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>2</h1>
                      <div className={style.paso1}>
                        <h2>
                          Confirma los detalles del pedido con tu comprador.
                        </h2>
                        <span>
                          Utiliza el messenger de Grabr para confirmar con tu
                          comprador detalles como el tamaño o el color del
                          pedido. También puedes preguntar si hay otros
                          artículos que les gustaría recibir
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso6} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>3</h1>
                      <div className={style.paso1}>
                        <h2>Compra el artículo con tu propio dinero.</h2>
                        <span>
                          De esta forma, sabrás exactamente lo que llevas. Tras
                          la entrega, recibirás un reembolso por el precio del
                          artículo y el pago de tu recompensa.
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso7} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                  <div className={style.pasoPorPasos}>
                    <div className={style.pasoPorInfo}>
                      <h1>4</h1>
                      <div className={style.paso1}>
                        <h2>
                          Entrega el pedido de tu comprador y recibe el pago
                        </h2>
                        <span>
                          Coordina una hora y lugar público para encontrarte con
                          tu comprador. Una vez tu comprador confirme que ha
                          recibido el pedido, transferiremos el pago a tu
                          cuenta.
                        </span>
                      </div>
                    </div>
                    <div className={style.pasoPorPhoto}>
                      <img src={Paso8} className={style.imgPaso1} alt="" />
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>

        <div className={style.unete}>
          <div className={style.titleUnete}>
            <h1>Unete a nuestra comunidad</h1>
          </div>
          <div className={style.buttonComunidad}>
            <button>COMPRAR</button>
            <button>VIAJAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
