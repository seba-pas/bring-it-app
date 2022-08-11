import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/BranchCard.module.css";
import { IoCreateOutline, IoCloseCircleOutline } from "react-icons/io5";
import { deleteBranch } from '../actions';
import { NavLink } from 'react-router-dom';

function BranchCard({ id, name, city, province, address }) {
    const dispatch = useDispatch();
    const businessToken = useSelector((state) => state.businessToken);
    const businessEmail = useSelector((state) => state.businessEmail);


    async function handleDelete(event) {
        event.preventDefault();
        swal({
            title: "¿Está seguro que quiere eliminar esta sede?",
            text: "Si elimina esta sede no podra visualizar todos sus productos",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("El producto ha sido eliminado con éxito", {
                    icon: "success",
                });
                dispatch(deleteBranch(id, businessToken, businessEmail));
            } else {
                swal("El producto no ha sido eliminado");
            }
        });

    }

    return (
        <tr>
            <th>{name}</th >
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
                    <button className={styles.btn} onClick={(event) => { handleDelete(event); }}>
                        <IoCloseCircleOutline />
                    </button>
                </div>
            </th>

        </tr>
    )
}

export default BranchCard