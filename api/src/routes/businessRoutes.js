const { Router } = require("express");
const { Business, Businessbranch, City, Product } = require('./../db');
const { getBusiness, getBusinessByEmail, getAllEmail } = require('../controllers/businessControllers');
const router = Router();
const nodemailer = require('nodemailer')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const { verifyToken } = require("../middlewares/verifyToken");

//POST JSON 
// /business/json
router.post("/json", async (req, res) => {
    try {
      const jsonBusiness = req.body;
      const businessesLoad = jsonBusiness.forEach( async (b) => {
        await Business.findOrCreate({
          where: {
            email: b.email,
            password: CryptoJS.AES.encrypt(b.password, process.env.PASS_SEC).toString(),
            businessName: b.businessName,
            cuit: b.cuit,
            taxBracket: b.taxBracket,
            phone: b.phone
          }
        })
      }) ;
      res.status(201).send('Business saved successfully') ;
    }catch(e){
      res.status(404).send(`error en postBusinessJson: ${e.message}`)
    }
  });

//get all emails
router.get('/email', async (req, res) => {
    try {
        const allEmail = await getAllEmail();
        res.status(200).send(allEmail);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//POST Business (para cargar una nueva empresa, aparte de los datos del modelo tiene q recibir una CityId)
// http://localhost:3001/business
router.post('/', async (req, res) => {
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
        const newBusinessBranch = await Businessbranch.create({ businessBranchName, businessEmail, cityId, province, address });

        
        const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: "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",
            },
         }))

         await transporter.sendMail({
            to: req.body.email,
            from: "bringitservices2022@gmail.com",
            subject: "Correo recibido satisfactoriamente",
            html: `<h3>Bienvenido a Bring It App, ${req.body.businessName}!</h3>
            <p>Estamos muy contentos de que formes parte de esta gran comunidad de 
            empresas alrededor del país. Desde Bring It les deseamos el mejor de los
            éxitos en su emprendimiento.
            </p>
            `,
         });


        res.send(newBusiness[1] ? "Empresa y sede creada" : "La empresa ya existe");


    } catch (error) {
        return res.send('error:' + error.message);
    }
});


//UPDATE BUSINESS
// http://localhost:3001/business/:email
//AGREGO EL MIDDLEWARE verifyToken para verificar q el q modifica su cuenta es la empresa en cuestion o el admin
router.put('/:email', verifyToken, async (req, res) => {
    if (req.userLogin.email === req.params.email || req.userLogin.isAdmin) {
        try {
            const { email } = req.params;
            const modification = req.body; //json con atributos a modificar y nuevos valores
            const q = await Business.update(modification, {
                where: { email: email }
            });
            res.status(201).send(`${q} Empresas modificadas`)
        } catch (e) {
            res.send('error:' + e.message)
        }
    } else {
        res.status(403).json(`No tiene permiso para modificar esta cuenta`);
    }
})


//DESACTIVACIÓN DE BUSINESS, BRANCHES Y PRODUCTOS
// http://localhost:3001/api/business/desactivate/:email

router.put('/desactivate/:email',verifyToken,async(req,res) => {
    if(req.userLogin.email === req.params.email || req.userLogin.isAdmin){ 
    try{
        const {email} = req.params;
        const q = await Business.update({active:false}, { //desactivacion business
            where: {email: email}
        });
        await Businessbranch.update({ active: false }, { //desactivacion businessbranch
            where: { businessEmail: email }
        });
        const businessBranches = await Businessbranch.findAll({ where: { businessEmail: email } })
        if (businessBranches) {
            await Product.update({ active: false }, {
                where: { //desactivacion producto
                    [Op.or]: businessBranches.map(b => {
                        return { businessbranchId: b.id }
                    })
                }
            })
        }
        res.status(201).send(`${q} Empresas modificadas`)
    } catch (e) { res.send('error:'+ e.message) }
} else{    
    res.status(403).json(`No tiene permiso para modificar esta cuenta`);
   }
})

//ACTIVACIÓN DE BUSINESS, BRANCHES Y PRODUCTOS
// http://localhost:3001/business/activate/:email
router.put('/activate/:email', verifyToken,async(req,res) => {
 
    if(req.userLogin.email === req.params.email || req.userLogin.isAdmin){ 
    try{
        const {email} = req.params;
        const q = await Business.update({active:true}, { //desactivacion business
            where: {email: email}
        });
        await Businessbranch.update({ active: true }, { //desactivacion businessbranch
            where: { businessEmail: email }
        });
        const businessBranches = await Businessbranch.findAll({ where: { businessEmail: email } })
        if (businessBranches) {
            await Product.update({ active: true }, {
                where: { //desactivacion producto
                    [Op.or]: businessBranches.map(b => {
                        return { businessbranchId: b.id }
                    })
                }
            })
        }
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
    //Agrego verificacion de token, userLogin viene de la fc verifyToken
    //si el usuario es admin entra, xq el admin puede banear, nadie mas puede.
    if(req.userLogin.isAdmin){ 
      try {
        await Business.update({deleted: true, active:false},{ //eliminacion y desactivacion de business
          where: {
              email: email,
          }})
        await Businessbranch.update({active: false}, { //desactivacion businessbranch
                where: {businessEmail: email}
            });
            const businessBranches = await Businessbranch.findAll({where: {businessEmail:email}})
            if (businessBranches) {
              await Product.update({active: false} ,{where:{ //desactivacion producto
                [Op.or]: businessBranches.map(b => {
                    return {businessbranchId: b.id}
                })
            }})}
      res.status(200).send('Se bloqueo la empresa correctamente');
      } catch (e) {
        res.send("error:" + e.message);
      }} else{
      res.status(403).json(`No tiene permiso para bloquear esta cuenta empresa`);
    }});

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
router.post('/login', async (req, res) => {
    try {
        const businessLogin = await Business.findByPk(req.body.email);
        if (!businessLogin) return res.send('Usuario no encontrado'); 
        const hashedPassword = CryptoJS.AES.decrypt(businessLogin.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== req.body.password) return res.status(201).send(`Datos incorrectos`);
        if (businessLogin.deleted) return res.status(201).send('Empresa bloqueada');
        
        const accessToken = jwt.sign({
            email: businessLogin.email,
            isBusiness: businessLogin.isBusiness
        }, process.env.JWT_SEC, { expiresIn: '1h' });

        const { password, ...others } = businessLogin;

        res.status(200).json({ others, accessToken });
    } catch (error) {
        res.status(404).send(`error:${error.message}`)
    }
})


//GET Business para traer todas las empresas con opcion a query name
// http://localhost:3001/api/business
router.get('/', (req, res) => {
    const { name } = req.query;
    try {
        return getBusiness(name).then(business =>
            typeof business === "object" ? res.json(business) : res.status(404).json(business));
    } catch (error) {
        return res.send(error);
    }
});

  // cambio de password
  router.put("/recover/password/:email", async (req, res) => {
    const userLogin = await Business.findByPk(req.params.email);
    const {passwordV}= req.body;
    const {passwordN}= req.body;

    const hashedPassword = CryptoJS.AES.decrypt(userLogin.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log("1: ",hashedPassword);
    console.log("2: ",originalPassword);
    console.log("3", passwordV);
    const passNueva=  CryptoJS.AES.encrypt(passwordN, process.env.PASS_SEC).toString();
    console.log(passNueva);

    if(originalPassword == passwordV) {
      console.log("4")
      try {

        await Business.update({password:passNueva}, {
          where: {
            email: req.params.email,
          }
        })

        // nodemailer
        const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: "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",
            },
         }))

         await transporter.sendMail({
            to: req.body.email,
            from: "bringitservices2022@gmail.com",
            subject: "Correo recibido satisfactoriamente",
            html: `<h3>Tu contraseña se modificó correctamente!</h3>
            <p>Ya podes iniciar sesion con tu contraseña nueva <a href="http://localhost:3000/">aqui</a></p>
            `,
         });
        


        res.json("contraseña cambiada")
      } catch(error) {
        console.log(error)
      }    
    } else {
      console.log("NOT FOUND") 
    }
});

//Olvide mi contraseña 

router.put('/recover/password/olv/:email', async (req,res )=>{
    const passN= Math.floor(Math.random(10000000 - 9000000) * 100000000);
    console.log(req.body.email);
    const userEmail = await Business.findByPk(req.params.email);
    console.log("contraseña nueva: ", passN.toString());
    // if(userEmail){
      const email = userEmail.email;
      console.log('EMAIL: ',email);
      console.log('PASS:',passN); 
      const passHash = CryptoJS.AES.encrypt(passN.toString(), process.env.PASS_SEC).toString();
      console.log('PASS ENCRYPTADA: ', passHash);
      try {
        await Business.update({password: passHash}, {
          where: {
            email: email,
          }
        })


        // nodemailer
        const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: "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",
            },
         }))

         await transporter.sendMail({
            to: req.body.email,
            from: "bringitservices2022@gmail.com",
            subject: "Correo recibido satisfactoriamente",
            html: `<h3>Tu contraseña se modifico correctamente!</h3>
            <p>Tienes que iniciar sesón con la siguiente contraseña: ${passN}</p>
            <p>Ya podés iniciar sesión con tu contraseña nueva <a href="http://localhost:3000/">aqui</a></p>
            <p>Recordá que es una contraseña provisoria, vas a tener que ingresar a tu panel de usuario para modificar la contraseña</p>
            `,
         });

        
        res.status(200).send('Correo enviado satisfactoriamente!');
      } catch (error) {
        console.log(error);
      }
    // }else{
    //   res.send('email no registrado');
    // }
    
    
  
  })




module.exports = router;
