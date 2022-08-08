const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require ("dotenv").config();
const morgan = require("morgan");
const routes = require("./routes/index.js");
const session = require ("express-session"); //para la aut de 3ros
const cookieSession = require ("cookie-session"); //para la aut de 3ros
const passport = require ("passport"); //para la aut de 3ros
const GoogleStrategy = require('passport-google-oauth20').Strategy; //para la aut de 3ros

require("./db.js");

const cors = require('cors')
const server = express();
//todo CHAT V1.0 ------------------------------------------



server.name = "API";


//Middlewares


server.use(express.json());
server.use(cors()); 

server.use(session({
  secret: [process.env.SESSION_KEY],
  resave: true,
  saveUninitialized: true
})); //para la aut de 3ros
server.use(
  cookieSession({name: "session", keys: [process.env.COOKIE_KEY], maxAge: 24*60*60*1000})
);
server.use(passport.initialize());//para la aut de 3ros
server.use(passport.session());//para la aut de 3ros
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //OJO DEPLOY // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});





// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});






//tiro aca abajo todo lo de aut de 3ros

const { User} = require('./db');


// Serializar y deserializar al user: 
//Deserializar: agarramos la cookie, obtenemos el id (email) a partir del token
// y chequeamos q exista en la bd un usuario con ese id (email). Si existe, autentica, sino no.
//Serializar: creamos la cookie a partir de los datos del usuario.

//3ER PASO se serializa el usuario
  //este user es el q se guardo en el findOrCreate
  passport.serializeUser((user, cb) => {
    //console.log("Serialización de usuario: ", user);
    cb(null, user.email); //el email es el "id" en nuestro modelo User
  });
  
  passport.deserializeUser(async (email, cb) => {
    const user = await User.findOne({ where: { email: email }}).catch((err) => {
      console.log("Error de deserialización: ", err);
      cb(err,null);
    });  
    
    //si encontro el user con findOne, lo pasa en la callback: 
    //console.log("Deserializacion de usuario: ", user);  
    if (user) cb(null,user);
  });




const GOOGLE_CALLBACK_URL = "http://localhost:3001/auth/google/callback" // //ojo deploy ver esto

//2DO PASO se busca o crea el usuario con los datos de la cuenta de Google
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true
      },//esta fc del 2do parametro es la q autentica al usuario con google en la app
      async (req, accessToken, refreshToken, profile, cb) => {
                
        const defaultUser = {
          email: profile.emails[0].value,          
          name: profile.name.givenName,
          lastname: profile.name.familyName,
          googleId: profile.id,
        };
  
        const user = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: defaultUser,
        }).catch((err) => {
          console.log("Error al registrarse/loggearse con Google", err);
          cb(err, null);
        });
        //findOrCreate devuelve un arreglo con 1 objeto
        //agregar el NODEMAILER SI ES NUEVO USUARIO, quizas separar el find or create, o ver segun la rta
        
        if (user && user[0]) return cb(null, user && user[0]);
           
      }
    )
  );

//1ER PASO a esta ruta se le pega para q aparezca lo de loggearte con google. En scope le decimos a google q datos queremos 
//http://localhost:3001/auth/login/google
server.get(
  "/auth/login/google", 
  passport.authenticate("google", { scope: ["profile", "email"] }));   


//4TO PASO cuando se logee o registre satisfactoriamente en google, va a llamar a esta ruta de callback, q redirecciona al front  
//http://localhost:3001/auth/google/callback
server.get(
  "/auth/google/callback",
  passport.authenticate("google", {    
    failureRedirect: "/login"      
  }),
  (req,res) => {
    //autenticacion exitosa, redirige al la ruta del FRONT donde se renderiza el componente q cierra solo
    //console.log("Ruta http://localhost:3001/auth/google/callback, req.user: ", req.user); //req.user se obtuvo de nuestra bd, viene de la deserializacion    
    res.redirect("http://localhost:3000/login/success");    
  }
);

//5TO PASO desde el front le pegan a esta ruta para obtener los datos del user loggeado con Google.
//Desde el front le mandan la cookie con los datos del loggeo (lo indican en axios con { withCredentials: true }), 
//la cookie aca en el back pasa por deserializacion, y asi se obtienen los datos del user al front
//http://localhost:3001/auth/authenticatedUser
server.get("/auth/authenticatedUser",  (req,res) => {  
  //console.log(`estoy en el get /authenticatedUser, req.user: `);
  try {
    if (req.user){
      //console.log(req.user);
      return res.status(200).json(req.user);
    }
    res.status(401).send("no hay req.user");
  } catch (error) {
    res.status(401).send("no hay req.user");
  }
});


//dejo esto aca abajo para q redireccione ahora, y no antes xq sino no entra a las rutas q estan aca en app
server.use("/", routes);




module.exports = server;