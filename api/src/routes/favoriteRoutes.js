const { Router } = require ("express");
const { addFavorite, getFavoriteProductsOfUser, getAllFavoriteProducts, removeFavorite } = require ('../controllers/favoriteControllers');
const { verifyToken } = require("../middlewares/verifyToken");
const router = Router();

//POST Favorite 
// http://localhost:3001/favorite
router.post('/', verifyToken, async (req,res) => {   
    const {userEmail, productId} = req.body; 
    console.log('soy body'+ req.body)   
    debugger; 
    //Agrego verificacion de token, userLogin viene de la fc verifyToken
    // (if el usuario loggeado es el mismo usuario cuyos datos se quieren modificar)
    if(req.userLogin.email === userEmail){      
        try {        
            const createdFavorite = await addFavorite ({...req.body});     
            //createdFavorite es un boolean: true si lo creó y false si lo encontro (y por ende no lo creó)
            if (createdFavorite) return res.send (`Favorito agregado correctamente`);
            else return res.send (`El producto con id: ${productId} ya se encuentra marcado como favorito para el usuario ${userEmail}`);
        } catch (error) {
            return res.status(404).send('error:'+ error.message);
        }
    }else{
        res.status(403).json(`No tiene permiso para agregarle al usuario ${userEmail} este producto como favorito`);
      }
});

//GET Favorite products of user. Devuelve los productos favoritos del usuario
// http://localhost:3001/favorite/user/:userEmail 
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
// http://localhost:3001/favorite/products (no el producto, solo la palabra products)
router.get('/products', (req,res) => {    
    try {
        return getAllFavoriteProducts().then(favorites => 
            typeof favorites === "object" ? res.status(200).json(favorites) : res.status(404).json(favorites));            
        } catch (error) {
            return res.send(error);
        }
});

//DELETE Favorite
// http://localhost:3001/favorite
router.delete('/', verifyToken, async (req,res) => {   
    const {userEmail, productId} = req.body; 
    //Agrego verificacion de token, userLogin viene de la fc verifyToken
    // (if el usuario loggeado es el mismo usuario cuyos datos se quieren modificar)
    if(req.userLogin.email === userEmail){    
        try {
            await removeFavorite ({...req.body});
            return res.send(`Producto de id ${productId} del usuario ${userEmail} no pertenece a favoritos`);        
            } catch (error) {
                return res.send(error);
            }
    }else{
        res.status(403).json(`No tiene permiso para eliminarle al usuario ${userEmail} este producto de sus favorito`);
      }
});

module.exports = router;