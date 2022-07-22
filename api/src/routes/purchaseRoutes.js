const { Router } = require("express");
const {Purchase, User} = require('../db');
const {getPurchase} = require( '../controllers/purchaseControllers');

const router = Router();

// GET ALL PURCHASES
router.get ('/', async (req, res)=>{
    try {
        const purchases = await getPurchase()
        res.status(200).send(purchases);
    } catch (error) {
        res.status(404).send(error.message);
    }
});



// POST PURCHASES
router.post('/', async (req, res)=>{
    const { totalPrice, waitingTime, arrivalCity } = req.body;

    try {
        const createdPurchase = await Purchase.create({
            // id,
            totalPrice,
            waitingTime,
            arrivalCity
        });
        // await createdPurchase.addUser(email);
        // await createdPurchase.addProduct(id=idProduct);

        res.status(200).send('Purchase completed');
        
    } catch (error) {
        res.status(404).send(`Error at postPurchase route: ${error}`);
    }

});




// UPDATE

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { totalPrice, waitingTime, arrivalCity } = req.body;
    try {
        const updatedPurchase = await Purchase.update({
            totalPrice,
            waitingTime,
            arrivalCity
        }, {
            where: {
                id
            }
        });
        res.status(200).send(`Purchase updated successfully`);
    } catch(err) {
        res.status(500).send(`Error at update route: ${err}`);
    }
})


module.exports = router;