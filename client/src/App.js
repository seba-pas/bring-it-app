import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import ProductManager from "./components/ProductManager.jsx"
import HomeBusiness from "./components/HomeBusiness.jsx"
import HomePersonas from "./components/HomePersonas";
// import NavBar from "./components/NavBar";

// import Home from "./components/Home";
// import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="App">
      <Switch>
        
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/persona" component={HomePersonas}/>
        <Route exact path="/empresas" component={HomeBusiness} />
      </Switch>
      
      {/* <div>
      <RegisterUser
      <NavBar />
      </div> */}

      {/* <ProductCard /> */}

      {/* <Home/> */}
      {/* <HomeBusiness /> */}
      {/* <ProductManager /> */}
    </div>
  );
}
//probandos
export default App;
