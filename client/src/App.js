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

// import NavBar from "./components/NavBar";

// import Home from "./components/Home";
// import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/persona" component={HomePersonas} />
        <Route exact path="/empresas" component={HomeBusiness} />
        <Route path="/productmanager/:id" component={ProductManager} />
        <Route exact path="/productmanager" component={ProductManager} />
        <Route exact path="/RegisterUser" component={RegisterUser} />
        <Route exact path="/RegisterBusiness" component={RegisterBusiness} />
      </Switch>
    </div>
  );
}
//probandos
export default App;
