const { Router } = require("express");
const {Purchase, User} = require('../db');
const {getDbPedidos} = require( '../controlers/getDBPedidos');
const {pedidosById} = require('../controlers/pedidosById');
const productRoutes = require ("./purchaseRoutes");

const router = Router();

router.post('/purchase', async (req, res)=>{
    try {
        let {
            id,
            idProduct,
            idUser,
            totalPrice,
            arrivalCity,
            waitingTime
        }= req.body;

        const createdPurchase = await Purchase.create({
            id,
            totalPrice,
            arrivalCity,
            waitingTime
        });
        await createdPurchase.addUser(idUser)
        await createdPurchase.addProduct(idProduct);

        res.status(200).send('Create Purchase completed');
        
    } catch (error) {
        res.status(404).send(error.message)
    }

});



router.get ('/pedidos', async (req, res)=>{
    try {
        return res.status(200).send(getDbPedidos());
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

router.delete('/pedidos/:id'), async (req, res)=>{
    const {id}=req.params
    try {
        await Purchase.destroy({
            where:{
                id,
            }
        })
        res.status(200).send('se elimino correctamente')
    } catch (error) {
        console.log(id)
        res.status(404).send(error.message)
    }
};
router.get('/pedidos/:id', async (req, res)=>{
    try {
        res.status(404).send(pedidosById(req));
        
    } catch (error) {
        res.status(404).send(message.error)
    }
});

router.use ('/purchase', purchaseRoutes);

module.exports = router;