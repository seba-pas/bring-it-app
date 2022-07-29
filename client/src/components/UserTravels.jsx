import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTravel } from '../actions';
import styles from "../styles/UserTravels.module.css"
import ProducTravelCard from './ProducTravelCard';


function UserTravels() {
    const gState = useSelector((state) => state);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        travels: [],
    })
    // useEffect(() => {
    //     dispatch(getAllTravel());
    // }, [dispatch])

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                travels: gState.allTravels.filter(e => e.userEmail === gState.user.others.dataValues.email),
            }
        })
    }, []);

    return (
        <div className={styles.travels} >
            <div className={styles.container}>
                <div className={styles.tableContainer}>
                    {<table>
                        <thead>
                            <tr className={styles.trStyle}>

                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {gState.allTravels.filter(e => e.userEmail === gState.user.others.dataValues.email)?.map(c => {
                                return (
                                    <ProducTravelCard key={c.id} id={c.id} arrivalCityId={c.arrivalCityId} arrivalDate={c.arrivalDate} arrivalProvince={c.arrivalProvince} startDate={c.startDate} travelCityId={c.travelCityId} travelProvince={c.travelProvince} />
                                )
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserTravels