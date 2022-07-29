import React from "react";
import ProductCard from './ProductCard'
import styles from "../styles/ProductCards.module.css";

export default function ProductCards({ currentProducts }) {
   
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
          />     
          ))}
    </div>
    </div>
  );
}