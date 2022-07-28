const Router =require('express');
const router= Router();

const Stripe = require('stripe');

const stripe= new Stripe('sk_test_51LPy6xFKxxhhwn5aTDrHK0XOqnU4aa8DjaPvLu6YLW0rfSknLAGSJSMWBbUWN1QT87XXHDahhrmBKKQbX10NJpqU00S9TboCrt');
router.post('/', async (req, res) => {
	const { id, amount } = req.body;
	console.log(id, amount);
	try {
		const payment = await stripe.paymentIntents.create({
			currency: "USD",
			amount,
			payment_method: id,
			confirm: true
		});
		console.log(payment);
		return res.status(200).json({ message: "Successful payment" });
	} catch(error) {
		console.log(error);
		return res.status(404).json(error);
	}
});
module.exports= router;

