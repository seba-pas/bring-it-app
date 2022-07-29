const { Favorite } = require ('../db');
const { Op } = require('sequelize');

async function addFavorite (dataFavorite){    
    const {userEmail, productId} = dataFavorite;
    try {        
        //con el findOrCreate no agrega 2 veces lo mismo a la tabla (bien xq solo hay una relacion userEmail-productId)
        const [newFavorite, created] = await Favorite.findOrCreate ({
            where: {
                userEmail:userEmail, 
                productId:productId
            }}); 
        return created;
    } catch (error) {
        throw new error (`No se puedo agregar el producto como favorito del usuario solicitado, ${error.message}`);
    }
}

async function getFavoriteProductsOfUser (userEmail){
    try {
        const foundFavorites = await Favorite.findAll({
            where: {
                userEmail: userEmail,                
            }
        });       
        return foundFavorites;        
    } catch (error) {
        throw new Error (`No se encontraron favoritos para el usuario solicitado, ${error}`);
    }     
}

async function getAllFavoriteProducts (){
    try {
        const foundFavorites = await Favorite.findAll({
        });  

        const orderedFavorites = {};
        foundFavorites.forEach (favorite => {
            if (favorite.productId in orderedFavorites){
                orderedFavorites[favorite.productId] ++;
            }
            else{
                orderedFavorites[favorite.productId] = 1;
            }
        });
        //aca iria un filter para evitar repeticiones, a falta de algun metodo especifico de sequelize     
        return orderedFavorites;        
    } catch (error) {
        throw new Error (`No se encontraron productos favoritos, ${error}`);
    }     
}

async function removeFavorite (dataFavorite){
    const {userEmail, productId} = dataFavorite;
    try {
        await Favorite.destroy({
                where: {
                    [Op.and]: [
                    {userEmail: userEmail},     
                    {productId: productId}
                ]           
                }
        });                   
    } catch (error) {
        throw new error (`No se pudo eliminar el producto de id ${productId} como favorito del usuario ${userEmail}, ${error.message}`);
    }
}

module.exports = {
    addFavorite,
    getFavoriteProductsOfUser,
    removeFavorite,
    getAllFavoriteProducts
};