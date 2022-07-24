const router = require('express').Router();
const { getCartById, createCart, getAllCarts, updateCart, deleteCart } = require('../controllers/cartControllers');


// CREATE A NEW CART
router.post('/', createCart);


// GET CART BY ID
router.get('/:userId', getCartById);


// GET ALL CARTS (ADMIN FUNCTIONALITY)
router.get('/', getAllCarts);


// UPDATE CART
router.put('/:id', updateCart);


// DELETE CART
router.delete('/:userId', deleteCart);



module.exports = router;