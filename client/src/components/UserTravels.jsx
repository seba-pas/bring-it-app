import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTravel } from '../actions';
import styles from "../styles/UserTravels.module.css"
import ProducTravelCard from './ProducTravelCard';
import { SpinnerCircularFixed } from "spinners-react";
import DataTable from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


function UserTravels() {
    const gState = useSelector((state) => state);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        travels: [],
    })
    useEffect(() => {
        dispatch(getAllTravel());
    }, [dispatch])

    useEffect(() => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                travels: gState.allTravels.filter(e => e.userEmail === gState.user.others.dataValues.email,
                )
            }
        })
    }, gState.allTravels)

    function deleteTravel() {
        alert("PROXIMAMENTE!!!");
    }

    function editUsers() {
        alert("PROXIMAMENTE!!!");
    }

    const columnas = [
        { name: "Fecha", selector: "startDate", sortable: true },
        { name: "Provincia", selector: "travelProvince", sortable: true },
        { name: "Ciudad", selector: "travelCityId", sortable: true },
        { name: "Fecha Llegada", selector: "arrivalDate", sortable: true },
        { name: "Provincia", selector: "arrivalProvince", sortable: true },
        { name: "Ciudad", selector: "arrivalCityId", sortable: true },
        {
            button: true,
            cell: () => (
                <button>
                    <FaPencilAlt style={{ marginRight: "15px", fontSize: "20px" }} onClick={(e) => editTravel(e)} />
                    <FaTrashAlt
                        style={{ fontSize: "20px" }}
                        onClick={(e) => deleteTravel(e)}
                    />
                </button>
            ),
        },
    ];

    return (
        <div>
            {input.travels.length > 0 ? (
                <div>
                    <DataTable
                        columns={columnas}
                        data={input.travels}
                        title="Listado de viajes"
                    />
                    <br />

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

    )
}

export default UserTravels
        // <div className={styles.travels} >
        //     <div className={styles.container}>
        //         <div className={styles.tableContainer}>
        //             {<table>
        //                 <thead>
        //                     <tr className={styles.trStyle}>

        //                         <th>Origen</th>
        //                         <th>Destino</th>
        //                         <th>Actions</th>

        //                     </tr>
        //                 </thead>
        //                 <tbody>

        //                     {input.travels?.map(c => {
        //                         return (
        //                             <ProducTravelCard key={c.id} id={c.id} arrivalCityId={c.arrivalCityId} arrivalDate={c.arrivalDate} arrivalProvince={c.arrivalProvince} startDate={c.startDate} travelCityId={c.travelCityId} travelProvince={c.travelProvince} />
        //                         )
        //                     })}
        //                 </tbody>
        //             </table>
        //             }
        //         </div>
        //     </div>
        // </div>