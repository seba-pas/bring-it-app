import React from "react";
import { NavLink } from "react-router-dom";
import image from "../components/img/logoCUT.png";
import styles from "../styles/NavBar.module.css";
import SearchBar from "./SearchBar";
import useModal from "./UseModal";
import Modal from "./Modal";
//seba
export default function NavBar() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [isOpenLoginModal, openLoginModal ,closeLoginModal ] = useModal();
=======
  const [isOpenLoginModal, openLoginModal, closeLoginModal] = useModal();
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
=======
  const [isOpenLoginModal, openLoginModal, closeLoginModal] = useModal();
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
=======
  const [isOpenLoginModal, openLoginModal, closeLoginModal] = useModal();
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
  return (
    <div className={styles.navbar}>
      <div className={styles.imagen}>
        <NavLink exact to="/">
          <img
            src={image}
            style={{ width: "auto", height: "100px" }}
            alt="Logo no encontrado"
          />
        </NavLink>
      </div>
      <div className={styles.SearchBar}>
        <SearchBar />
      </div>
      <div className={styles.contbotones}>
        <NavLink to="/Login">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <button >INGRESAR</button>
        </NavLink>
        <button onClick={openLoginModal}>REGISTRARSE</button>
       
       <Modal isOpen={isOpenLoginModal} 
       closeModal={closeLoginModal}>
         <h1>Quieres registrarte como:</h1>
         <NavLink to="/RegisterBusiness">
           <button>Empresa</button>
         </NavLink>
         <NavLink to="/RegisterUser">
           <button>Persona</button>
         </NavLink>
       </Modal>
=======
=======
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
=======
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
          <button>INGRESAR</button>
        </NavLink>
        <button onClick={openLoginModal}>REGISTRARSE</button>

        <Modal isOpen={isOpenLoginModal} 
        closeModal={closeLoginModal}>
          <h1>Quieres registrarte como:</h1>
          <NavLink to="/RegisterBusiness">
            <button>Empresa</button>
          </NavLink>
          <NavLink to="/RegisterUser">
            <button>Persona</button>
          </NavLink>
        </Modal>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
=======
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
=======
>>>>>>> e69c554dd2286e011e59a15178f8e8e8d52e12d8
      </div>
    </div>
  );
}
