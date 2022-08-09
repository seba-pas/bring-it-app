const { Router } = require("express");
const router = Router();
const nodemailer = require('nodemailer')

router.post("/", async(req, res) => {

	const { email } = req.body
	console.log("1", email)
	try {
			// nodemailer
			// let transporter = nodemailer.createTransport({
   //      	host: 'smtp.gmail.com',
   //      	port: 465,
   //      	secure: true,
   //      	auth: {
   //        	user: 'bringit662@gmail.com',
   //        	pass: 'baiepxymtdopmjuj'
   //     		}
   //    	});

   //    	await transporter.sendMail({
   //      	from: "Bring It App <bringit662@gmail.com>",
   //      	to: email,
   //      	subject: "Cambio de contraseña",
   //      	html: `<h3>Solicitaste un cambio de contraseña, podrás hacerlo haciendo click en este <p><a href="http://localhost:3000/recuperarContrasenia">enlace</a></p></h3>`
   //    	})
   //    	console.log("2", email)


      res.status(200).send(email)
	} catch(error) {
		res.status(404).json(error);
	}
})


module.exports = router;