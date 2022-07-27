const { Router } = require("express");
const { User } = require("./../db");
const { getUsers, getUserByEmail } = require("../controllers/userControllers");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const router = Router();

//POST / CREATE User
// http://localhost:3001/api/user
router.post("/", async (req, res) => {
  // const { email, password, name, lastname, birthDate } = req.body;
  // if (!email || !password || !name || !lastname || !birthDate) {
    // res.status(404).send("Faltan datos para crear el usuario");
  // } else {
    try {
      const newUser = await User.findOrCreate({
        where: {
          email: req.body.email,
          name: req.body.name,
          lastname: req.body.lastname,
          birthDate: req.body.birthDate,
          age: req.body.age,
          password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        }
      });
      
      // nodemailer
//     let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'ole85@ethereal.email',
//         pass: 'SuJC1F27bydJJHSAW4'
//     }
// });
      

//       const email = await transporter.sendMail({
//         from: "farias.agustin@outlook.com",
//         to: 'fariasagustin3@gmail.com',
//         subject: "Email de prueba",
//         text: "Hola mundo"
//       })

//       console.log(email.messageId)

      res.status(201).send(newUser[1] ? "Usuario creado" : "El usuario ya existe");
    } catch (e) {
      res.send("error:" + e.message);
    }
  // }
});

// PUT / UPDATE USER
// http://localhost:3001/api/user/:email
router.put("/:email", async (req, res) => {
    const { email } = req.params;
    const modification = req.body; //json con atributos a modificar y nuevos valores
  try {
    const q = await User.update(modification, {
      where: { email: email },
    });
    res.status(201).send(`${q} Usuarios modificadas`);
  } catch (e) {
    res.send("error:" + e.message);
  }
});

//GET / GET ALL USERS
// http://localhost:3001/api/user
router.get("/", async (req, res) => {
  try {
    const dbUsers = await getUsers();
    res.status(201).send(dbUsers);
  } catch (e) {
    res.send("error:" + e.message);
  }
});

// GET / GET user detail by id
// http://localhost:3001/api/user
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
// http://localhost:3001/api/user/login
router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findByPk(req.body.email);

    if (!userLogin) res.send("Usuario no encontrado");

    const hashedPassword = CryptoJS.AES.decrypt(userLogin.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if(originalPassword !== req.body.password) return res.status(401).send(`Datos incorrectos`);

    const accessToken = jwt.sign({
      id: userLogin.id
    }, process.env.JWT_SEC, { expiresIn: '1d' });

    const { password, ...others } = userLogin;

    res.status(200).json({others, accessToken});
  } catch (error) {
    res.status(404).send(`error:${error.message}`);
  }
});

module.exports = router;
