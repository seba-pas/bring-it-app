const { Router } = require ("express");
const { Province } = require ('../db');

const router = Router();

//POST Province (ruta interna nuestra, ahora hay q cargar a mano (postman), luego vendran los datos de un json)
// http://localhost:3001/api/province
router.post('/', async (req,res) => {
    //el id tiene q ser un string, segun el modelo Province
    const {id, name} = req.body;    
    try {        
        const newProvince = await Province.create ({id, name});        
        return res.send (`Provincia agregada correctamente`);
    } catch (error) {
        return res.status(404).send('error:'+ error.message);
    }
});


module.exports = router;