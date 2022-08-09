import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavourite, getFavourites, postFavourites } from "../actions";
import swal from "sweetalert";

export default function AddFavourites() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const product = useSelector((state) => state.productsDetail);
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favourites);
  const [toggle, setToggle] = useState(false);


  const email = user.email;
  const id = product.id;

  const allFavorites = Array.isArray(favorites)
    ? favorites?.map((e) => e.productId)
    : [];


  useEffect(() => {
    dispatch(getFavourites(email));
  }, [dispatch]);
  useEffect(() => {
    allFavorites && allFavorites.includes(id) ? setToggle(true) : toggle;
  }, [id, favorites, allFavorites, user]);

  const handleClick = (e) => {
    e.preventDefault();
    if (toggle === false) {
      setToggle(true);
      dispatch(
        postFavourites(
          {
            userEmail: email,
            productId: id,
          },
        )
      );
      swal(
        "Felicitaciones!",
        `Añadiste ${product.name} a tu lista de favoritos`,
        "success"
      );
      return;
    }
    if (toggle === true) {
      setToggle(false);
      debugger;
      dispatch(
        deleteFavourite({
          userEmail: email,
          productId: id,
        })
      );
      setToggle(false);
      swal(
        `El producto ${product.name} ha sido borrado con éxito`,
        "Puedes volver a agregarlo cuando desees",
        "success"
      );
      setToggle(false);
    } else {
      swal("Te Pedimos disculpas", "Vuelve a intentarlo", "warning");
      return;
    }
    //action delete
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}
    >
      <button onClick={(e) => handleClick(e)}>
        {toggle && toggle === true ? (
          <span id="heart" aria-label="Fav" role="img">
            💜
          </span>
        ) : (
          <span id="heart" aria-label="Fav" role="img">
            🤍
          </span>
        )}
      </button>
    </div>
  );
}
