const { Router } = require("express");
const { User } = require("./../db");
const { getUsers, getUserByEmail } = require("../controllers/userControllers");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const router = Router();
const sendgridTransport = require('nodemailer-sendgrid-transport')
const { verifyToken } = require ("../middlewares/verifyToken");


//POST JSON 
// /user/json
router.post("/json", async (req, res) => {
  try {
    const jsonUser = req.body;
    const usersLoad = jsonUser.forEach( async (u) => {
      await User.findOrCreate({
        where: {
          email: u.email,
          password: CryptoJS.AES.encrypt(u.password, process.env.PASS_SEC).toString(),
          name: u.name,
          lastname: u.lastname,
          birthDate: u.birthDate,
          isAdmin: u.isAdmin,
          phone: u.phone
        }
      })
    }) ;
    res.status(201).send('Users saved successfully') ;
  }catch(e){
    res.status(404).send(`error en postUserJson: ${e.message}`)
  }
});

//PUT / baneo de User (SOLO LO PUEDE HACER ADMIN)
// http://localhost:3001/user/baneo/:email
router.put("/baneo/:email", verifyToken, async (req, res) => {
  const email=req.params.email; 
  //console.log(`email ${email} de la ruta put`)
  //Agrego verificacion de token, userLogin viene de la fc verifyToken
  //si el usuario es admin entra, xq el admin puede banear, nadie mas puede.
  //console.log(`req.userLogin.isAdmin de la ruta put baneo ${req.userLogin.isAdmin}`);
  if(req.userLogin.isAdmin){ 
    try {
      await User.update({deleted: true},{
        where: {
            email:email,
        }
    })
    res.status(200).send('Se bloqueo el usuario correctamente');
    } catch (e) {
      res.send("error:" + e.message);
    } } else{
    res.status(403).json(`No tiene permiso para bloquear esta cuenta usuario`);
  }   
});


//POST / CREATE User
// http://localhost:3001/user
router.post("/", async (req, res) => {
    try {
      const newUser = await User.findOrCreate({
        where: {
          email: req.body.email,
          name: req.body.name,
          lastname: req.body.lastname,
          birthDate: req.body.birthDate,
          // age: req.body.age,
          phone: req.body.phone,
          password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        }
      });

      // nodemailer
      const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: process.env.CREDENTIAL,
            },
         }))

         await transporter.sendMail({
            to: req.body.email,
            from: "pruebabringit@gmail.com",
            subject: "Correo recibido satisfactoriamente",
            html: `<h3>Bienvenido a Bring It App, ${req.body.name}!</h3>
              <p>Estamos muy contentos de que formes parte de esta gran comunidad
              te invito a que te suscribas a nuestra newsletter
              <br />
              para recibir ofertas interesantes a futuro
              </p>
              `,
         });

      res.status(201).send(newUser[1] ? "Usuario creado" : "El usuario ya existe");
    } catch (e) {
      res.send("error:" + e);
    }
  // }
});

// PUT / UPDATE USER (TAMBIEN DESACTIVACION Y ACTIVACION DE USER)
// http://localhost:3001/user/:email
//AGREGO EL MIDDLEWARE verifyToken para verificar q el q modifica su cuenta es el usuario en cuestion o el admin
router.put("/:email", verifyToken, async (req, res) => {
  const { email } = req.params;   
  const modification = req.body; //json con atributos a modificar y nuevos valores    
  // console.log(`estoy en update user ${email} antes del if, req.headers.authorization: ${req.headers.authorization}`);
  //Agrego verificacion de token, userLogin viene de la fc verifyToken
  // (if el usuario loggeado es el mismo usuario cuyos datos se quieren modificar, o es admin)
  if(req.userLogin.email === req.params.email || req.userLogin.isAdmin){  
    // console.log(`soy req.userLogin.isAdmin: ${req.userLogin.isAdmin}`);  
    // console.log(`estoy en update user ${email}`);
    try {
      const q = await User.update(modification, {         
        where: { email: email },
      });
      res.status(201).send(`${q} Usuarios modificados`);
    } catch (e) {
      res.send("error:" + e.message);
    }      
    
  } else{ 
    res.status(403).json(`No tiene permiso para modificar esta cuenta`);
  }   
});


//GET / GET ALL USERS
// http://localhost:3001/user
router.get("/", async (req, res) => {
  try {
    const dbUsers = await getUsers();
    res.status(201).send(dbUsers);
  } catch (e) {
    res.send("error:" + e.message);
  }
});

// GET / GET user detail by email
// http://localhost:3001/user
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const dbUserByEmail = await getUserByEmail(email);
    res.status(201).send(dbUserByEmail);
  } catch (e) {
    res.send("error:" + e.message);
  }
});

//POST / LOG IN para ingreso de usuario
// http://localhost:3001/user/login
router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findByPk(req.body.email);
    if (!userLogin) return res.status(201).send("Usuario no encontrado");
    const hashedPassword = CryptoJS.AES.decrypt(userLogin.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if(originalPassword !== req.body.password) return res.status(201).send(`Datos incorrectos`);
    if (userLogin.deleted) return res.status(201).send('Usuario bloqueado');
    const accessToken = jwt.sign({
      email: userLogin.email,
      isBusiness: userLogin.isBusiness,
      isAdmin: userLogin.isAdmin
    }, process.env.JWT_SEC, { expiresIn: '30m' });

    const { password, ...others } = userLogin;

    res.status(200).json({others, accessToken});
  } catch (error) {
    res.status(404).send(`error:${error.message}`);
  }
});

// Cambiar contraseña usuario 
router.put("/recover/password/:email", async (req, res) => {
    const userLogin = await User.findByPk(req.params.email);
    const {passwordV}= req.body;
    const {passwordN}= req.body;
    const hashedPassword = CryptoJS.AES.decrypt(userLogin.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const passNueva=  CryptoJS.AES.encrypt(passwordN, process.env.PASS_SEC).toString();
    if(originalPassword == passwordV) {
      try {

        await User.update({password:passNueva}, {
          where: {
            email:  req.params.email,
          }
        })

        const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: process.env.CREDENTIAL,
            },
         }))


         await transporter.sendMail({
            to: req.body.email,
            from: "pruebabringit@gmail.com",
            subject: "Correo recibido satisfactoriamente",
            html: `<h3>Tu contraseña se modifico cotrrectamente!</h3>
        <p>Ya podes iniciar sesion con tu contraseña nueva <a href="https://bring-it-app.vercel.app/modificarContrasenia">aqui</a></p>
        `,
         });

        res.json("contraseña cambiada")
      } catch(error) {
        console.log('208',error)
      }    
    } else {
      console.log("contraseña incorrecta")  
    }
});


//Olvide mi contraseña 

router.put('/recover/password/olv/pass', async (req,res )=>{
  const passN= Math.floor(Math.random(10000000 - 9000000) * 100000000);
  const userEmail= await User.findByPk(req.body.email);
  if(userEmail){
    const email=userEmail.email;    
    const passHash=   CryptoJS.AES.encrypt(passN.toString(), process.env.PASS_SEC).toString();
    try {
      await User.update({password:passHash}, {
        where: {
          email: email,
        }
      })
        res.status(200).send('listo');
    } catch (error) {
      console.log(error.message);
    }
  }else{
    res.send('email no rregistrado');
  }
  
  

})
 

//LOG IN para usuario loggeado con Google
//Cuando el log in con Google es exitoso, desde el front se le pega a esta ruta. Aca le ponemos el JWT Token
//"http://localhost:3001/user/google/login/" 
router.post("/google/login", (req, res) => {
  //del front viene por body la info del usuario loggeado con google
  
  try {
    if (!req.body) return res.status(201).send("No se recibio información del usuario loggeado con Google");
    const accessToken = jwt.sign({
      email: req.body.email,
      isBusiness: req.body.isBusiness,
      isAdmin: req.body.isAdmin,
    }, process.env.JWT_SEC, { expiresIn: '30m' });
    //console.log(accessToken);          
    
    const userInfo = req.body; 
    return res.status(200).json({userInfo, accessToken});

  } catch (error) {
    res.status(404).send(`error:${error.message}`);
  }   
 });


module.exports = router;
