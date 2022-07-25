import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/HomePersonas.module.css";
import { SpinnerCircularFixed } from "spinners-react";
import { getUsers } from '../actions';
import NavBarAdmin from './NavBarAdmin';



export default function HomeAdmin() {
    const dispatch = useDispatch();
    const USERS = useSelector((state) => state.users);
    const [orden, setOrden] = useState("");

    useEffect(() => {
        dispatch(getUsers());
    },[dispatch]);

  return (
    <div>
        <NavBarAdmin/>
        {USERS.length > 0 ? (
            <div>
                <table>
                    <thead>
                        <tr>
                            {USERS.map((user) => {
                                return(
                                    <th value={user.name} key={user.email}>
                                        {user.name}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                </table>
            </div>
            ) : (
            <div className={styles.spinner}>
                <SpinnerCircularFixed
                size={150}
                thickness={100}
                speed={100}
                color="rgba(65, 212, 207, 1)"
                secondaryColor="rgba(0, 0, 0, 1)"
                />
            </div>
        )}
    </div>
  );
}

