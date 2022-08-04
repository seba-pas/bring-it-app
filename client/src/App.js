import "./App.css";
import decode from 'jwt-decode'
import React from "react";
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import Usuario from './components/Usuario.jsx'
import Unauthorized from './components/Errores/401/Unauthorized';
import Vidriera from './components/Vidriera'



function App() {

  const user = useSelector((state) => state.user)
  console.log(user)
  const business = useSelector((state) => state.business)

  return (
    <div style={{ backgroundColor: "#F6F5F5" }} className="App">
      <Switch>
        <Route exact path="/pruebaCloudinary" component={PruebaCloudinary} />
        <Route path="/unauthorized" component={Unauthorized} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/conocemas" component={ConoceMas} />
        <Route exact path="/RegisterUser" component={RegisterUser} />
        <Route exact path="/RegisterBusiness" component={RegisterBusiness} />
        <Route exact path="/vidriera" component={Vidriera} />

        {/* AUTORIZACIÓN PARA USER */}

        {
          user.active ?
          <Route path="/filtro" component={FilterBefore} /> : 
          <Redirect to="/" />
        }
        {
          user.active ? 
          <Route path="/persona" component={HomePersonas} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ?
          <Route path="/compra" component={CheckOut} /> :
          <Redirect to="/" />
        }
        {/*<Route exact path="/persona/modificarPassword" component={RecuperarPassword}/>*/}
        {
          !user.isBusiness ? 
          <Route exact path="/persona/modificarPassword" component={RecuperarPassword} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ? 
          <Route exact path="/persona/homeUserPurchase" component={HomeUserPurchase} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ?
          <Route exact path="/persona/misviajes" component={UserTravels} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ?
          <Route exact path="/product/:id" component={ProductDetail} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ?
          <Route exact path="/filtroprov" component={FilterProvince} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ?
          <Route exact path='/compra' component={CheckOut} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ?
          <Route exact path='/usuarioE' component={Usuario} /> :
          <Redirect to="/" />
        }
        {
          !user.isBusiness ?
          <Route exact path="/perfilUser" component={PerfilUser} /> :
          <Redirect to="/" />
        }
        {
          (!user.isBusiness && user.isAdmin) ?
          <Route exact path="/admin" component={HomeAdmin} /> : 
          <Redirect to="/" />
        }

        {/* RUTAS PARA EMPRESAS */}

        {
          (business.isBusiness && !user) ?
          <Route exact path="/empresas" component={HomeBusiness} /> :
          <Redirect to="/" />
        }
        {
          (business.isBusiness && !user) ?
          <Route path="/productmanager/:id" component={ProductManager} /> :
          <Redirect to="/" />
        }
        {
          (business.isBusiness && !user) ?
          <Route exact path="/productmanager" component={ProductManager} /> :
          <Redirect to="/" />
        }
        {
          (business.isBusiness && !user) ?
          <Route path="/perfil/:id" component={PerfilBusiness} /> :
          <Redirect to="/" />
        }
        {
          (business.isBusiness && !user) ?
          <Route exact path="/perfil" component={PerfilBusiness} /> :
          <Redirect to="/" />
        }

        
        {/* <Route exact path="/testing" component={FormTravel} /> */}
      </Switch>
    </div>
  );
}
//probandos
export default App;
