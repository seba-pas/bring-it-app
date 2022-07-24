const { Router } = require("express");
const { User } = require("./../db");
const { getUsers, getUserByEmail } = require("../controllers/userControllers");
const router = Router();

//POST / CREATE User
// http://localhost:3001/api/user
router.post("/", async (req, res) => {
  const { email, password, name, lastname, birthDate } = req.body;
  if (!email || !password || !name || !lastname || !birthDate) {
    res.status(404).send("Faltan datos para crear el usuario");
  } else {
    try {
      const newUser = await User.create({
        email,
        password,
        name,
        lastname,
        birthDate,
      });
      console.log(newUser);
      res.status(201).send("Usuario creado");
    } catch (e) {
      res.send("error:" + e.message);
    }
  }
});

// PUT / UPDATE USER
// http://localhost:3001/api/user/:email
router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const modification = req.body; //json con atributos a modificar y nuevos valores
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
    const { email, password } = req.body;
    const userLogin = await User.findByPk(email);
    if (!userLogin) {
      res.send("Usuario no encontrado");
    } else {
      if (userLogin.email === email && userLogin.password === password) {
        res.status(201).json(userLogin);
      } else {
        res.send("Datos incorrectos");
      }
    }
  } catch (error) {
    res.status(404).send(`error:${error.message}`);
  }
});

module.exports = router;
