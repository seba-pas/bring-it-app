const { Router } = require ("express");
const { City } = require ('../db');

const router = Router();

//POST City (ruta interna nuestra, ahora hay q cargar a mano (postman), luego vendran los datos de un json)
// http://localhost:3001/api/city
router.post('/', async (req,res) => {
    //el id tiene q ser un string, segun el modelo City
    const {id, name, ProvinceId} = req.body;  
    try {        
        const newCity = await City.create ({id, name, ProvinceId});        
        return res.send (`Ciudad agregada correctamente`);
    } catch (error) {
        return res.status(404).send('error:'+ error.message);
    }
});


module.exports = router;