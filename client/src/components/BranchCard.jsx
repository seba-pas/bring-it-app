import React from 'react'
import { useDispatch } from 'react-redux';
import styles from "../styles/BranchCard.module.css";
import { IoCreateOutline, IoCloseCircleOutline } from "react-icons/io5";
import { deleteBranch } from '../actions';
import { NavLink } from 'react-router-dom';

function BranchCard({ id, name, city, province, address }) {
    const dispatch = useDispatch();
    async function handleEdit(event) {
        event.preventDefault();
        //dispatch(editBranch(id));

    }
    async function handleDelet(event) {
        event.preventDefault();
        dispatch(deleteBranch(id));

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
                    <button className={styles.btn} onClick={(event) => { handleDelet(event); }}>
                        <IoCloseCircleOutline />
                    </button>
                </div>
            </th>

        </tr>
    )
}

export default BranchCard