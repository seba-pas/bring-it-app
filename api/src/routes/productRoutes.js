const { Console } = require("console");
const { Router } = require("express");
const { getProductById, getProducts } = require('../controllers/productControllers');
const { verifyToken } = require("../middlewares/verifyToken");
const { Product } = require('./../db');
const router = Router();

//POST new Product
// http://localhost:3001/product
router.post('/', verifyToken, async (req, res) => {
    //Agrego verificacion de token, userLogin viene de la fc verifyToken
    // (if la empresa loggeada es la misma empresa que quiere agregar un producto)
    const businessEmail = req.body.businessEmail;    
    if(req.userLogin.email === businessEmail){
        try {
            const categoryId = req.body.categoryId;
            const newProduct = await Product.create({ ...req.body });
            await newProduct.addCategory(categoryId);
            res.status(201).send("producto agregado")
        } catch (error) {
            return res.status(404).send(`error: ` + error);
        }
    }else{
        res.status(403).json(`No tiene permiso para agregar productos a la sede de esta empresa ${businessEmail}`);
      } 
})

//GET Product detail (id por params)
// http://localhost:3001/api/product/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
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
router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        return getProducts(name).then(products =>
            res.send(products));
    } catch (error) {
        return res.send(error);
    }
});

//UPDATE PRODUCT 
// http://localhost:3001/api/product/:id
router.put('/:id', verifyToken, async (req, res) => {
    //Agrego verificacion de token, userLogin viene de la fc verifyToken
    // (if la empresa loggeada es la misma empresa que quiere editar un producto)
    const businessEmail = req.body.businessEmail;
    if(req.userLogin.email === businessEmail || req.userLogin.isAdmin ){    
    try {
            const { id } = req.params;
            const modification = req.body; //json con atributos a modificar y nuevos valores
            const q = await Product.update(modification, {
                where: { id: id }
            });
            const foundProduct = await Product.findByPk(id);
            await foundProduct.setCategories(modification.categoryId);
            res.status(201).send(`${q} Productos modificados`)
        } catch (e) {
            res.send('error:' + e.message)
        }
    }else{
    res.status(403).json(`No tiene permiso para editar productos de la sede de esta empresa ${businessEmail}`);
  } 
})

//DELETE PRODUCT // BACK UP (No se usa)
// http://localhost:3001/api/product/:id
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Product.destroy({
            where: { id: id }
        });
        res.status(201).send('Productos eliminados:')
    } catch (e) {
        res.send('error:' + e.message)
    }
})

module.exports = router;