const { Router } = require ("express");
const {  getBusiness, getBusinessByEmail } = require ('../controllers/businessControllers');
const {Business, Businessbranch, City} = require('./../db');
const router = Router();
const nodemailer = require('nodemailer')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { verifyToken } = require ("../middlewares/verifyToken");

//POST Business (para cargar una nueva empresa, aparte de los datos del modelo tiene q recibir una CityId)
// http://localhost:3001/business
router.post('/', async (req,res) => {    
    try {
        const newBusiness = await Business.findOrCreate({
            where: {
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
                businessName: req.body.businessName,
                cuit: req.body.cuit,                
                taxBracket: req.body.taxBracket,
                logo: req.body.logo,
                phone: req.body.phone
            }
        });   

        //Agregado de primera sede obligatoria
        const businessEmail = req.body.email;
        const { businessName, cityId, province, address } = req.body;
        const cityName = (await City.findByPk(cityId)).nombre;
        const businessBranchName = `${businessName} - sede ${cityName}`;
        const newBusinessBranch = await Businessbranch.create({businessBranchName, businessEmail, cityId, province, address});               
  
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
            subject: "¡Bienvenido a Bring It Empresas!",
            html: `<h3>Bienvenido a Bring It App, ${req.body.businessName}!</h3>
            <p>Estamos muy contentos de que formes parte de esta gran comunidad de 
            empresas alrededor del país. Desde Bring It les deseamos el mejor de los
            éxitos en su emprendimiento.
            </p>
            `
        })

        res.send(newBusiness[1] ? "Empresa y sede creada" : "La empresa ya existe"); 


    } catch (error) {
        return res.send('error:'+ error.message);
    }
});


//UPDATE BUSINESS
// http://localhost:3001/business/:email
//AGREGO EL MIDDLEWARE verifyToken para verificar q el q modifica su cuenta es la empresa en cuestion o el admin
router.put('/:email', verifyToken, async(req,res) => {
    if(req.userLogin.email === req.params.email || req.userLogin.isAdmin){  
    try{
        const {email} = req.params;
        const modification = req.body; //json con atributos a modificar y nuevos valores
        const q = await Business.update(modification, {
            where: {email: email}
        });
        res.status(201).send(`${q} Empresas modificadas`)
    } catch (e) {
       res.send('error:'+ e.message)
   }
   } else{    
    res.status(403).json(`No tiene permiso para modificar esta cuenta`);
   }
})




//PUT / baneo de Business
// http://localhost:3001/business/baneo/:email
router.put("/baneo/:email", verifyToken, async (req, res) => {
    const email=req.params.email; 
    //console.log(`email ${email} de la ruta put`)
    //Agrego verificacion de token, userLogin viene de la fc verifyToken
    //si el usuario es admin entra, xq el admin puede banear, nadie mas puede.
    //console.log(`req.userLogin.isAdmin de la ruta put baneo ${req.userLogin.isAdmin}`);
    if(req.userLogin.isAdmin){ 
  
      try {
        await Business.update({deleted: true},{
          where: {
              email,
          }
      })
      res.status(200).send('Se bloqueo la empresa correctamente');
      } catch (e) {
        res.send("error:" + e.message);
      }      
      
    } else{
      res.status(403).json(`No tiene permiso para bloquear esta cuenta empresa`);
    }   
  });

// GET / GET business detail by email
// http://localhost:3001/business
router.get("/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const dbBusinessByEmail = await getBusinessByEmail(email);
      res.status(201).send(dbBusinessByEmail);
    } catch (e) {
      res.send("error:" + e.message);
    }
  });


//POST / LOG IN  para ingreso de business
// http://localhost:3001/business/login
router.post('/login', async(req,res) => {
    try {
        const businessLogin = await Business.findByPk(req.body.email);

        if (!businessLogin) return res.send('Usuario no encontrado');

        const hashedPassword = CryptoJS.AES.decrypt(businessLogin.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password) return res.status(201).send(`Datos incorrectos`);

        const accessToken = jwt.sign({
            email: businessLogin.email,
            isBusiness: businessLogin.isBusiness
        }, process.env.JWT_SEC, { expiresIn: '30m' });

        const { password, ...others } = businessLogin;

        res.status(200).json({others, accessToken});
    } catch (error) {
        res.status(404).send(`error:${error.message}`)
    }
})


//GET Business para traer todas las empresas con opcion a query name
// http://localhost:3001/api/business
router.get('/', (req,res) => {
    const {name} = req.query;
    console.log(`search: ${name}`);
    try {
        return getBusiness(name).then(business => 
            typeof business === "object" ? res.json(business) : res.status(404).json(business));
    } catch (error) {
        return res.send(error);
    }
});

module.exports = router;