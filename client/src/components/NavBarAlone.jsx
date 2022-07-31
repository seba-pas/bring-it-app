import { React} from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import logo from "./img/logoCUT.png";
import userProfile from "./img/userPerfilImage.jpg";





export default function NavBarAlone() {
  return (
    <div className={styles.navbar}>

    <div className={styles.imagen}>
      <Link to='/'>
      <img
        src={logo}
        style={{ width: "auto", height: "100px" }}
        alt="Logo no encontrado"
      />
      </Link>
    </div>
    </div>
  )
}
