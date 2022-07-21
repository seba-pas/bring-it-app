const { Router } = require ("express");
const { addCategory } = require ('../controllers/categoryControllers');

const router = Router();

//POST Category (ruta interna nuestra, ahora se carga a mano, luego se va a precargar con un json de categorias)
// http://localhost:3001/api/category
router.post('/', async (req,res) => {
    try {
        console.log('en try del post category');
        const addedCategory = await addCategory ({...req.body});
        return res.send (`Categoría agregada correctamente`);
    } catch (error) {
        return res.status(404).send('error:'+ error.message);
    }
});

module.exports = router;