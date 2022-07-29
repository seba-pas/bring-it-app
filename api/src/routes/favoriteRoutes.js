const { Router } = require ("express");
const { addFavorite, getFavoriteProductsOfUser, getAllFavoriteProducts, removeFavorite } = require ('../controllers/favoriteControllers');
const router = Router();

//POST Favorite 
// http://localhost:3001/api/favorite
router.post('/', async (req,res) => {   
    const {userEmail, productId} = req.body; 
    try {        
        const createdFavorite = await addFavorite ({...req.body});          
        //createdFavorite es un boolean: true si lo creó y false si lo encontro (y por ende no lo creó)
        if (createdFavorite) return res.send (`Favorito agregado correctamente`);
        else return res.send (`El producto con id: ${productId} ya se encuentra marcado como favorito para el usuario ${userEmail}`);
    } catch (error) {
        return res.status(404).send('error:'+ error.message);
    }
});

//GET Favorite products of user. Devuelve los productos favoritos del usuario
// http://localhost:3001/api/favorite/use/:userEmail 
router.get('/user/:userEmail', (req,res) => {  
    const userEmail = req.params.userEmail;  
    try {
        return getFavoriteProductsOfUser(userEmail).then(favorite => 
            typeof favorite === "object" ? res.status(200).json(favorite) : res.status(404).json(favorite));
            
        } catch (error) {
            return res.send(error);
        }
});

//GET All favorite products. Devuelve todos los productos favoritos -> favorites: {productId:cantidad}
// http://localhost:3001/api/favorite/products (no el producto, solo la palabra products)
router.get('/products', (req,res) => {    
    try {
        return getAllFavoriteProducts().then(favorites => 
            typeof favorites === "object" ? res.status(200).json(favorites) : res.status(404).json(favorites));            
        } catch (error) {
            return res.send(error);
        }
});

//DELETE Favorite
// http://localhost:3001/api/favorite
router.delete('/', async (req,res) => {   
    const {userEmail, productId} = req.body; 
    try {
        await removeFavorite ({...req.body});
        return res.send(`Producto de id ${productId} del usuario ${userEmail} no pertenece a favoritos`);        
        } catch (error) {
            return res.send(error);
        }
});

module.exports = router;