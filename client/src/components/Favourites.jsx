import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByPurchaseEmail, getFavourites } from "../actions/index";
import ProductCards from "./ProductCards";

export default function Favourites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favourites);
  const products = useSelector((state) => state.products);
  const email = user.email;

  useEffect(() => {
    dispatch(getFavourites(email));
  }, [dispatch]);

  const allFavouriteId = Array.isArray(favorites)
    ? favorites.map((e) => e.productId)
    : [];

  var favoriteProducts = [];
  for (let i = 0; i < allFavouriteId.length; i++) {
    products.forEach((e) => {
      if (e.id == allFavouriteId[i]) {
        favoriteProducts.push(e);
      }
    });
  }

  // const rarisimo = products?.filter((e) => e.id == allFavouriteId);

  return (
    <div>
      {favoriteProducts?.length > 0 ? (
        <div>
          <ProductCards currentProducts={favoriteProducts} />
        </div>
      ) : (
        <div style={{ background: 'white',color: '#8c52ff', fontSize: '20px', height: '200px' }}>
          <br />
            <div style={{ marginTop: '50px' }}>
              <h1 >Tu lista de favoritos está vacía</h1>
            </div>
        </div>
      )}
    </div>
  );
}
