import React, { useEffect } from "react";
//Aca se redirecciona cuando el loggeo con Google es exitoso. Se auto cierra en 1000 ms
function LoginGoogleSuccess (){

    useEffect(() => {
        setTimeout(() => {
            window.close();  
        }, 1000);
    },[]);

    
    return (
        <div>
            <h2>Gracias por loggearte con Google!</h2>
        </div>
    )
}

export default LoginGoogleSuccess;
