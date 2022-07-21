const { Router } = require ("express");
const { getProductById, addProduct, getProducts } = require ('../controllers/productControllers');

const router = Router();

//POST new Product
router.post('/', async (req,res) => {
    console.log(req.body);
    try {
        const addedProduct = await addProduct ({...req.body});         
        return res.send (`Producto agregado correctamente`);
    } catch (error) {
        return res.status(404).send(`error: ` + error);
    }
})

//GET Product detail (id por params)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`En ruta product/id, el id recibido por params es: ${id}`);

    try {
        getProductById(id).then(product => 
            //Si es objeto lo devuelve, si es texto diciendo q no se encontro el objeto, pone estado de error y lo devuelve
            typeof product === 'object' ? res.json(product) : res.status(404).json(product)); 
    } catch (error) {
        res.send(error);
    }
});

//GET Products con opcion query name
router.get('/', (req,res) => {
    const {name} = req.query;
    console.log(`search: ${name}`);
    try {
        return getProducts(name).then(products => 
            typeof products === "object" ? res.json(products) : res.status(404).json(products));
    } catch (error) {
        return res.send(error);
    }
});

module.exports = router;