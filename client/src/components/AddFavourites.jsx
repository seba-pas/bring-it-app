import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFavourites } from "../actions";
import swal from "sweetalert";

export default function AddFavourites() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const product = useSelector((state) => state.productsDetail);
  const user = useSelector((state) => state.user);

  const token = globalState.userToken;
  const email = user.email;
  const id = product.id;

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      postFavourites(
        {
          userEmail: email,
          productId: id,
        },
        token
      )
    );
    swal(
      "Felicitaciones!",
      `Añadiste ${product.name} a tu lista de favoritos`,
      "success"
    );
  };

  return (
    <div>
      <button onClick={(e) => handleClick(e)}>
        <span aria-label="Fav" role="img">
          🤍
        </span>
      </button>
    </div>
  );
}
