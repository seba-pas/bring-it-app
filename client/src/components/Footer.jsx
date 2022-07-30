import React from "react";
import style from "../styles/Footer.module.css";

function Footer() {
  return (
    <div>
      <div className={style.footerContainer}>
        <footer className={style.main_footer}>
          <p className={style.copy}>
            © 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
