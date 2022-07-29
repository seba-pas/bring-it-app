import React from "react";
import ProductCard from './ProductCard'
import styles from "../styles/ProductCards.module.css";
import { useSelector } from "react-redux";

export default function ProductCards({ currentProducts }) {
  const BUSINESS = useSelector((state) => state.business2);
   
  return (
    // <div className={styles.grid}>
    <div className="card-deck" style={{display: "flex", justifyContent: "flex-end", marginTop: "40px", width: "100%"}}>
      <div className="row" style={{justifyContent: "space-around"}}>
      {currentProducts.map((el) => (        
        <ProductCard
        key={el.id}
          name={el.name}
          price={el.price}
          weight={el.weight}
          description={el.description}
          image={el.image}
          id={el.id}
          businessName={el.business === null?'Ninguna Empresa': el.business.businessName }
          categories={el.categories}
          // cityId={el.business === null?'Ninguna Ciudad' : el.business.cityId}
          />     
          ))}
          {/* <div>
         { BUSINESS.map((e) => e.city.nombre)}

          </div> */}
          {console.log(currentProducts)}
    </div>
    </div>
  );
}