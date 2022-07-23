const { Router } = require ("express");
const { addCategory, getCategory } = require ('../controllers/categoryControllers');

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

//GET Category
// http://localhost:3001/api/category
router.get('/', (req,res) => {    
    try {
        return getCategory().then(category => 
            typeof category === "object" ? res.status(200).json(category) : res.status(404).json(category));
            
        } catch (error) {
            return res.send(error);
        }
});

module.exports = router;