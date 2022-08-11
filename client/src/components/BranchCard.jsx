import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/BranchCard.module.css";
import { IoCreateOutline, IoCloseCircleOutline } from "react-icons/io5";
import { deleteBranch } from "../actions";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

function BranchCard({ id, name, city, province, address }) {
  const dispatch = useDispatch();
  const businessToken = useSelector((state) => state.businessToken);
  const businessEmail = useSelector((state) => state.businessEmail);

  async function handleDelete(event) {
    event.preventDefault();
    console.log("borrar");
    swal({
      title: "¿Está seguro que quiere eliminar su sede?",
      text: "Si desactiva su sede ya no podrás vender tus productos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Su sede ha sido eliminada!", {
          icon: "success",
        });
        dispatch(deleteBranch(id, businessToken, businessEmail));
      } else {
        swal("Su sede no ha sido eliminada");
      }
    });
  }

  return (
    <tr>
      <th>{name}</th>
      {/* <th>{city}</th> */}
      <th>{province}</th>
      <th>{address}</th>
      <th>
        <div className={styles.btncontainer}>
          <NavLink to={`/empresas/perfil/${id}`}>
            <button className={styles.btn}>
              <IoCreateOutline />
            </button>
          </NavLink>
          <button
            className={styles.btn}
            onClick={(event) => {
              handleDelete(event);
            }}
          >
            <IoCloseCircleOutline />
          </button>
        </div>
      </th>
    </tr>
  );
}

export default BranchCard;
