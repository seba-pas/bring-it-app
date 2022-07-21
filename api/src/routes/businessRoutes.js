const { Router } = require ("express");
const { addBusiness } = require ('../controllers/businessControllers');

const router = Router();

//POST Business (para cargar una nueva empresa, aparte de los datos del modelo tiene q recibir una CityId)
router.post('/', async (req,res) => {    
        
    try {                
        const addedBusiness = await addBusiness ({...req.body});        
        return res.send (`Empresa agregada correctamente`);
    } catch (error) {
        return res.status(404).send('error:'+ error.message);
    }
});

module.exports = router;