import React from "react";
import style from "../styles/Footer.module.css";

function Footer() {
  return (
    <div>
      <div className={style.footerContainer}>
      <footer className={style.main_footer}>
        <div className={style.footer__section}>
            <h2 className={style.footer__title}>About</h2>
            <p className={style.footer__txt}>Curabitur non nulla sit amet nislinit tempus convallis quis ac lectus. lac inia eget consectetur sed, convallis at tellus. Nulla porttitor accumsana tincidunt.</p>
        </div>
        <div className={style.footer__section}>
            <h2 className={style.footer__title}>Location: </h2>
            <p className={style.footer__txt}>0926k 4th block building, king Avenue, New York City.</p>
            <h2 className={style.footer__title}>Contact</h2>
            <p className={style.footer__txt}>Phone : +121 098 8907 9987</p>
            <p className={style.footer__txt}>Email : info@example.com</p>
        </div>
        <div className={style.footer__section}>
            <h2 className={style.footer__title}>Quick Links</h2>
            <a href="" className={style.footer__link}>Home</a>
            <a href="" className={style.footer__link}>About</a>
            <a href="" className={style.footer__link}>Error</a>
            <a href="" className={style.footer__link}>Shop</a>
            <a href="" className={style.footer__link}>Contact</a>
        </div>
        <div className={style.footer__section}>
            <h2 className={style.footer__title}>Sign up for your offers</h2>
            <p className={style.footer__txt}>By subscribing to our mailing list you will always get latest news and updates from us.</p>
        </div>
        <p className={style.copy}>© 2022 Bring it. All Rights Reserved | Design by Grupo 8 Soy Henry</p>
      </footer>
      </div>
    </div>
  );
}

export default Footer;
