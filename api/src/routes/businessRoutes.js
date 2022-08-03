const { Router } = require ("express");
const {  getBusiness, getAllEmail } = require ('../controllers/businessControllers');
const {Business, Businessbranch, City} = require('./../db');
const router = Router();
const nodemailer = require('nodemailer')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//MENSAJE DE CELE PARA CELE: falta hacer la fc verifyToken al igual q en userRoutes, y ponerla en put y baneo, y en el componente editarBusiness del front

//POST Business (para cargar una nueva empresa, aparte de los datos del modelo tiene q recibir una CityId)
// http://localhost:3001/api/business
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
// http://localhost:3001/api/business/:email
router.put('/:email', async(req,res) => {
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
})

//POST para ingreso de usuario
// http://localhost:3001/api/business/login
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
        }, process.env.JWT_SEC, { expiresIn: '1d' });

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

//get all emails
router.get('/email',async (req,res) => {
    try {
        const allEmail= await getAllEmail();
        res.status(200).send(allEmail);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;