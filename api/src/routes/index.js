const { Router } = require("express");
const {Purchase, User} = require('../db');

const router = Router();
const getDbPedidos = async ()=>{
    return Purchase.findAll({
        include:{
            model: User,
            attributes: ['Email'],
            through:{
                atributes: [],
            },
        },
    });
};

router.get ('/api/pedidos', async (req, res)=>{
    try {
        return res.status(200).send(getDbPedidos);
    } catch (error) {
        return res.status(404).send(message.error);
    }
})


module.exports = router;