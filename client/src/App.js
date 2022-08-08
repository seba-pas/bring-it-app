import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import ProductManager from "./components/ProductManager.jsx";
import HomeBusiness from "./components/HomeBusiness.jsx";
import HomePersonas from "./components/HomePersonas.jsx";
import RegisterUser from "./components/RegisterUser.jsx";
import RegisterBusiness from "./components/RegisterBusiness.jsx";
import { ProductDetail } from "./components/ProductDetail";
import PerfilBusiness from "./components/PerfilBusiness";
// import FormPurchase from "./components/FormPurchase";
import HomeAdmin from "./components/HomeAdmin";
import PerfilUser from "./components/PerfilUser";
import UserTravels from "./components/UserTravels";
import ConoceMas from "./components/ConoceMas";
import CheckOut from "./components/Stripe/CheckOut";

import FilterBefore from "./components/FilterBefore";
import FilterProvince from "./components/FilterProvince";
import HomeUserPurchase from "./components/HomeUserPurchase";
import RecuperarPassword from "./components/RecuperarPassword";
import PruebaCloudinary from "./components/PruebaCloudinary";
import Usuario from './components/Usuario.jsx';

import LoginGoogleSuccess from './components/LoginGoogleSuccess';

function App() {
  return (
    <div style={{ backgroundColor: "#F6F5F5" }} className="App">
      <Switch>
      <Route exact path="/pruebaCloudinary" component={PruebaCloudinary} />

        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/conocemas" component={ConoceMas} />
        <Route exact path="/persona/misviajes" component={UserTravels} />
        <Route exact path="/persona" component={HomePersonas} />
        <Route exact path="/empresas" component={HomeBusiness} />
        <Route path="/productmanager/:id" component={ProductManager} />
        <Route exact path="/productmanager" component={ProductManager} />
        <Route exact path="/RegisterUser" component={RegisterUser} />
        <Route exact path="/RegisterBusiness" component={RegisterBusiness} />
        <Route exact path="/filtro" component={FilterBefore} />
        <Route exact path="/filtroprov" component={FilterProvince} />
        {/* <Route path='/checkout' component={CheckOut} /> */}
        <Route exact path='/usuarioE' component={Usuario}/>
        <Route exact path='/compra' component={CheckOut}/>
        <Route path="/perfil/:id" component={PerfilBusiness} />
        <Route exact path="/perfil" component={PerfilBusiness} />
        <Route exact path="/perfilUser" component={PerfilUser} />
        <Route exact path="/admin" component={HomeAdmin} />
        <Route exact path="/persona/modificarPassword" component={RecuperarPassword}/>
        <Route exact path="/persona/homeUserPurchase" component={HomeUserPurchase}/>
        {/* <Route exact path="/testing" component={FormTravel} /> */}

        {/* Soy Cele: Agrego rutas de redireccion para el login success o login error (autenticacion con google*/}
        <Route exact path="/login/success" component={LoginGoogleSuccess}/>
        <Route exact path="/login/error">Error al loggearte con Google. Intenta de nuevo!</Route>
      </Switch>
    </div>
  );
}
//probandos
export default App;
