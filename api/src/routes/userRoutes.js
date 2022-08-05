const { Router } = require("express");
const { User } = require("./../db");
const { getUsers, getUserByEmail } = require("../controllers/userControllers");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const router = Router();
const { verifyToken } = require ("../middlewares/verifyToken");

//PUT / baneo de User
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
            email,
        }
    })
    res.status(200).send('Se bloqueo el usuario correctamente');
    } catch (e) {
      res.send("error:" + e.message);
    }      
    
  } else{
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
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'bringit662@gmail.com',
          pass: 'owtgyxnzmbchbhjj'
        }
      });

      const email = await transporter.sendMail({
        from: "Bring It App <bringit662@gmail.com>",
        to: req.body.email,
        subject: "¡Bienvenido/a!",
        html: `<h3>Bienvenido a Bring It App, ${req.body.name}!</h3>
        <p>Estamos muy contentos de que formes parte de esta gran comunidad
        te invito a que te suscribas a nuestra newsletter
        <br />
        para recibir ofertas interesantes a futuro
        </p>
        `
      })

      res.status(201).send(newUser[1] ? "Usuario creado" : "El usuario ya existe");
    } catch (e) {
      res.send("error:" + e.message);
    }
  // }
});

// PUT / UPDATE USER
// http://localhost:3001/user/:email
//AGREGO EL MIDDLEWARE verifyToken para verificar q el q modifica su cuenta es el usuario en cuestion o el admin
router.put("/:email", verifyToken, async (req, res) => {
  const { email } = req.params;
  const modification = req.body; //json con atributos a modificar y nuevos valores    
  console.log(`estoy en update user ${email} antes del if, req.headers.authorization: ${req.headers.authorization}`);
  //Agrego verificacion de token, userLogin viene de la fc verifyToken
  // (if el usuario loggeado es el mismo usuario cuyos datos se quieren modificar, o es admin)
  if(req.userLogin.email === req.params.email || req.userLogin.isAdmin){  
    console.log(`soy req.userLogin: ${req.userLogin}`);
    console.log(`soy req.userLogin.isAdmin: ${req.userLogin.isAdmin}`);  
    console.log(`estoy en update user ${email}`);
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



// Ruta para cambiar la contraseña del usuario

// router.put("/recover/password/:email", async (req, res) => { 
//   const { passwordOne } = req.body;
//   const { passwordTwo } = req.body;
//   const { email } = req.params;

//   const encPass = CryptoJS.AES.encrypt(passwordTwo, process.env.PASS_SEC);

//   const user = await User.findOne({ where: { email } })
//   const hashed = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
//   const decPass = hashed.toString(CryptoJS.enc.Utf8);

//   if(passwordOne === decPass) {
//     try {
//       await User.update(encPass, {
//         where: {
//           email
//         }
//       })
//       res.json("Listo papurro")
//     } catch(err) {
//       console.log(err)
//     }    
//   } else {
//     console.log("NOT FOUND")
//   }


// });

module.exports = router;
