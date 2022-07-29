const { Console } = require("console");
const { Router } = require ("express");
const { getProductById, getProducts } = require ('../controllers/productControllers');
const {Product} = require('./../db');
const router = Router();

//POST new Product
// http://localhost:3001/api/product
router.post('/', async (req,res) => {
    try {
        const categoryId = req.body.categoryId;
        const newProduct = await Product.create({...req.body});    
        await newProduct.addCategory (categoryId);   
        res.status(201).send("producto agregado")
    } catch (error) {
        return res.status(404).send(`error: ` + error);
    }
})

//GET Product detail (id por params)
// http://localhost:3001/api/product/:id
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
// http://localhost:3001/api/product
router.get('/', (req,res) => {
    const {name} = req.query;
    console.log(`search: ${name}`);
    try {
        return getProducts(name).then(products => 
           res.send(products));
    } catch (error) {
        return res.send(error);
    }
});

//UPDATE PRODUCT 
// http://localhost:3001/api/product/:id
router.put('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const modification = req.body; //json con atributos a modificar y nuevos valores
        const q = await Product.update(modification, {
            where: {id: id}
        });
        const foundProduct = await Product.findByPk(id);
        await foundProduct.setCategories(modification.categoryId);
        res.status(201).send(`${q} Productos modificados`)
    } catch (e) {
       res.send('error:'+ e.message)
   }
})

//DELETE PRODUCT // A PROBAR SI FUNCIONA
// http://localhost:3001/api/product/:id
router.delete('/:id', async(req,res) => {
    try{
        let {id} = req.params;
        await Product.destroy({
            where: {id: id}
        });
        res.status(201).send('Productos eliminados:')
    } catch (e) {
       res.send('error:'+ e.message)
   }
})

module.exports = router;