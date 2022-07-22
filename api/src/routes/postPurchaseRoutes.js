// const { Router } = require("express");
// const {Purchase, User, Product} = require('../db');

// const router = Router();
// // no anda
// router.post('/purchase', async (req, res)=>{
//     try {
//         let {
//             id,
//             idProduct,
//             email,
//             totalPrice,
//             waitingTime,
//             arrivalCity
//         }= req.body;

//         const createdPurchase = await Purchase.create({
//             id,
//             totalPrice,
//             waitingTime,
//             arrivalCity
//         });
//         await createdPurchase.addUser(email);
//         await createdPurchase.addProduct(id=idProduct);

//         res.status(200).send('Purchase completed');
        
//     } catch (error) {
//         res.status(404).send(error.message)
//     }

// });


// module.exports = router;