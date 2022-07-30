import React from "react";
import ProductCard from "./ProductCard";

export default function ProductCards({ currentProducts }) {
  return (  
    <div
      className="card-deck"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "40px",
        width: "100%",
      }}
    >
      <div className="row" style={{ justifyContent: "space-evenly", minWidth: '100%' }}>
        {currentProducts.map((el) => (
          <ProductCard
            key={el.id}
            name={el.name}
            price={el.price}
            weight={el.weight}
            description={el.description}
            image={el.image}
            id={el.id}
            business={el.businessbranch}
            categories={el.categories}
          />
        ))}
      </div>
    </div>
  );
}
