import "./App.css";
import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import ProductManager from "./components/ProductManager.jsx";
import RecuperarContrasenia from "./components/RecuperarContrasenia";
import HomeBusiness from "./components/HomeBusiness.jsx";
import HomePersonas from "./components/HomePersonas.jsx";
import RegisterUser from "./components/RegisterUser.jsx";
import RegisterBusiness from "./components/RegisterBusiness.jsx";
import { ProductDetail } from "./components/ProductDetail";
import PerfilBusiness from "./components/PerfilBusiness";
import HomeAdmin from "./components/HomeAdmin";
import PerfilUser from "./components/PerfilUser";
import UserTravels from "./components/UserTravels";
import ConoceMas from "./components/ConoceMas";
import CheckOut from "./components/Stripe/CheckOut";
import Vidriera from "./components/Vidriera";
import FilterBefore from "./components/FilterBefore";
import FilterProvince from "./components/FilterProvince";
import HomeUserPurchase from "./components/HomeUserPurchase";
import RecuperarPassword from "./components/RecuperarPassword";
import PruebaCloudinary from "./components/PruebaCloudinary";
import Usuario from "./components/Usuario.jsx";
import RecuperarPasswordBusiness from "./components/RecuperarPasswordBusiness";
import OlvidastePassword from "./components/OlvidastePassword";
import TableMatchTravels from "./components/TableMatchTravels.jsx";
import Join from "./components/Join.jsx";

import Favourites from "./components/Favourites";
import Chat from "./components/Chat";
import RecuperarContraseniaBusiness from "./components/RecuperarContraseniaBusiness";
import LoginGoogleSuccess from "./components/LoginGoogleSuccess";
import Reviews from "./components/Reviews";

function App() {
  const user = useSelector((state) => state.user);
  const business = useSelector((state) => state.business);

  return (
    <div style={{ backgroundColor: "#F6F5F5" }} className="App">
      <Switch>
        <Route
          exact
          path="/recuperarContraseniaBusiness"
          component={RecuperarContraseniaBusiness}
        />
        <Route exact path="/recuperarPassword" component={OlvidastePassword} />
        <Route
          exact
          path="/recuperarContrasenia"
          component={RecuperarContrasenia}
        />
        <Route exact path="/join" component={Join} />
        <Route exact path="/chat" component={Chat} />
        {/* <Route exact path="/pruebaCloudinary" component={PruebaCloudinary} /> */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/conocemas" component={ConoceMas} />
        <Route exact path="/RegisterUser" component={RegisterUser} />
        <Route exact path="/RegisterBusiness" component={RegisterBusiness} />
        <Route exact path="/vidriera" component={Vidriera} />
        <Route exact path="/persona/usuarioE" component={Usuario} />
        <Route
          path="/persona/filtro"
          render={() =>
            user !== "clean" ? <FilterBefore /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/persona"
          render={() =>
            user !== "clean" ? <HomePersonas /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/persona/modificarPassword"
          component={RecuperarPassword}
        />
        <Route
          exact
          path="/persona/homeUserPurchase"
          component={HomeUserPurchase}
        />
        <Route exact path="/persona/misviajes" component={UserTravels} />
        <Route exact path="/persona/product/:id" component={ProductDetail} />
        <Route exact path="/persona/filtroprov" component={FilterProvince} />
        <Route exact path="/persona/favoritos" component={Favourites} />
        <Route
          exact
          path="/persona/compra"
          render={() => (user !== "clean" ? <CheckOut /> : <Redirect to="/" />)}
        />
        <Route exact path="/persona/perfilUser" component={PerfilUser} />
        <Route
          exact
          path="/admin"
          render={() => (user.isAdmin ? <HomeAdmin /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/empresas"
          render={() =>
            business !== "clean" ? <HomeBusiness /> : <Redirect to="/" />
          }
        />
        <Route path="/empresas/productmanager/:id" component={ProductManager} />
        <Route
          exact
          path="/empresas/productmanager"
          component={ProductManager}
        />
        <Route path="/empresas/perfil/:id" component={PerfilBusiness} />
        <Route exact path="/empresas/perfil" component={PerfilBusiness} />
        <Route
          exact
          path="/empresas/modificarPasswordBusiness"
          component={RecuperarPasswordBusiness}
        />

        <Route
          exact
          path="/persona/matchTravelsPurchases"
          component={TableMatchTravels}
        />

        {/* <Route exact path="/testing" component={FormTravel} /> */}

        {/* Soy Cele: Agrego rutas de redireccion para el login success o login error (autenticacion con google*/}
        <Route exact path="/login/success" component={LoginGoogleSuccess} />
        <Route exact path="/login/error">
          Error al loggearte con Google. Intenta de nuevo!
        </Route>
      </Switch>
    </div>
  );
}
//probandos
export default App;
