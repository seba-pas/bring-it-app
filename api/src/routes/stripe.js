const express = require('express');
const Stripe = require('stripe');
const nodemailer = require('nodemailer')
const { verifyTokenUser } = require('../middlewares/verifyToken')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const router = express.Router();

// Vamos a configurar el backend de modo que podamos requerir a Stripe
// Primero creamos un nuevo servidor:


// Una vez confirmado que los datos los recibimos por body, vamos a mandarlos
// a Stripe!
const stripe = new Stripe('sk_test_51LPy6xFKxxhhwn5aTDrHK0XOqnU4aa8DjaPvLu6YLW0rfSknLAGSJSMWBbUWN1QT87XXHDahhrmBKKQbX10NJpqU00S9TboCrt')

// Configuramos el cors para que no haya problemas con el front

// configuramos express para que pueda leer objetos JSON


// Ahora creamos la ruta a la que vamos a recibir los datos del post en el 
// frontend
router.post('/payment', async (req, res) => {
	const { id, amount, email, name, emailBusiness} = req.body;
	console.log("id: ", id, "amount: ", amount, "email: ", email, "name: ", name)
	try {
		const payment = await stripe.paymentIntents.create({
			currency: "USD",
			amount,
			description: "Keyboard Gaming",
			payment_method: id,
			confirm: true
		});
		console.log("payment", payment)

        // holis
		// nodemailer



        const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: process.env.CREDENTIAL,
            },
         }))

        await transporter.sendMail({
            from: "Bring It App <pruebabringit@gmail.com>",
            to: email,
            subject: "Pago realizado satisfactoriamente",
            html: `<h3>¡Muchas gracias por tu compra, ${name}!</h3>
            <p>Tu compra se ha completado satisfactoriamente
            muchas gracias por elegir Bring It App.
            </p>
            `
        })

        await transporter.sendMail({
            from: "Bring It App <bringitservices2022@gmail.com>",
            to: emailBusiness,
            subject: "Compraron un producto de tu empresa",
            html: `<h3>¡Acaban de hacer una compra, el usuario ${email}!</h3>
            <p>Tu compra se ha completado satisfactoriamente
            muchas gracias por elegir Bring It App.
            </p>
            `
        })



		res.json({ msg: "Successful payment" })
	} catch(error) {
		console.log(error)
		res.json({ message: error })
	}
});

module.exports= router