const { Cart, User, Product } = require('../db');


// CREATE CART
const createCart = async(req, res) => {
	try {
		const cart = await Cart.findOrCreate({
			where: {
				userId: req.body.userId,
				productId: req.body.productId,
				quantity: req.body.quantity
			}
		});
		res.status(200).json(cart)
	} catch(err) {
		res.status(404).json(`Error at createCart controller function: ${err}`);
	}
}




// GET CART BY ID
const getCartById = async(req, res) => {
	try {
		const cart = await Cart.findAll({
			where: {
				userId: req.params.userId
			}
		});
		res.status(200).json(cart);
	} catch(error) {
		res.status(404).json(`Error at get cart by id controller function: ${err}`);
	}
}




// GET ALL CARTS (ADMIN FUNCTIONALITY)
const getAllCarts = async(req, res) => {
	try {
		const allCarts = await Cart.findAll();
		res.status(200).json(allCarts)
	} catch(error) {
		res.status(404).json(`Error at getAllCarts controller function: ${error}`)
	}
}




// UPDATE CART
const updateCart = async(req, res) => {
	const { id } = req.params;
	const { userId, productId, quantity } = req.body;
	try {
		const cart = await Cart.update({
			userId,
			productId,
			quantity
		}, {
			where: {
				id
			}
		});
		res.status(200).json(cart)
	} catch(error) {
		res.status(404).json(`Error at updateCart controller function: ${error}`);
	}
}



// DELETE CART
const deleteCart = async(req, res) => {
	const { userId } = req.params;
	try {
		await Cart.destroy({
			where: {
				userId
			}
		});
		res.status(200).json(`Cart deleted successfully`);
	} catch(error) {
		res.staus(404).json(`Error at deleteCart controller function: ${error}`);
	}
}



module.exports = { createCart, getCartById, getAllCarts, updateCart, deleteCart }