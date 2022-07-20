import "./App.css";
import React from "react";

import HomeBusiness from "./components/HomeBusiness";
import ProductManager from "./components/ProductManager";

import NavBar from "./components/NavBar";

// import Home from "./components/Home";
// import HomePersonas from "./components/HomePersonas";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div>

      <div>

      <NavBar />
      </div>

      <ProductCard />

      {/* <Home/> */}
      {/* <HomePersonas /> */}
    </div>
  );
}
//probandos
export default App;
