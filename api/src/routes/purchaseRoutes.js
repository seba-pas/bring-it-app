const { Router } = require("express");
const {Purchase, User} = require('../db');
const {getPurchase} = require( '../controllers/purchaseControllers');

const router = Router();


router.get ('/purchase', async (req, res)=>{
    try {
        return res.status(200).send( getPurchase());
    } catch (error) {
        return res.status(404).send(error.message);
    }
});


module.exports = router;