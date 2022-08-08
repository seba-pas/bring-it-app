import React, { useState } from 'react'
import "../styles/Join.css";
import logo from "./img/logo2-removebg-preview.png";
import { Link } from "react-router-dom";

let user;


const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}


const Join = () => {

    const [name, setname] = useState("");

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logo} alt="logo" />
                <h1>CONECTA</h1>
                <input onChange={(e) => setname(e.target.value)} placeholder="Escribi tu nombre" type="text" id="joinInput" />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser} className="joinbtn">Ingresar</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }
