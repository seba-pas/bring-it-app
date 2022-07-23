const { Router } = require ("express");
const { addBusiness } = require ('../controllers/businessControllers');
const {Business} = require('./../db');
const router = Router();

//POST Business (para cargar una nueva empresa, aparte de los datos del modelo tiene q recibir una CityId)
// http://localhost:3001/api/business
router.post('/', async (req,res) => {    
    try {                
        const addedBusiness = await addBusiness ({...req.body});        
        return res.send (`Empresa agregada correctamente`);
    } catch (error) {
        return res.status(404).send('error:'+ error.message);
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
        const {email, password} = req.body;
        const businessLogin = await Business.findByPk(email);
        if (!businessLogin) { 
        res.status(404).send('Usuario no encontrado') 
    } else {
        if (businessLogin.email === email && businessLogin.password === password) {
             res.status(201).send('Datos correctos')
        } else { res.status(404).send('Datos incorrectos')}
    }
    } catch (error) {
        res.status(404).send(`error:${e.message}`)
    }
})

module.exports = router;