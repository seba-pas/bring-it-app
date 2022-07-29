import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTravel } from '../actions';
import styles from "../styles/UserTravels.module.css"

function UserTravels() {
    // const gState = useSelector((state) => state);
    // const dispatch = useDispatch();

    // const [input, setInput] = useState({
    //     travels: [],
    // })
    // useEffect(() => {
    //     dispatch(getAllTravel());
    // }, [dispatch])

    // useEffect(() => {
    //     setInput((prevInput) => {
    //         return {
    //             ...prevInput,
    //             travels: gState.allTravels.filter(e => e.businessEmail === gState.user.email),
    //         }
    //     })
    // }, [gState]);
    // console.log("user travels", input.travels)





    return (
        <div>UserTravels</div>
    )
}

export default UserTravels