const { Router } = require("express");
const router = Router();
const nodemailer = require('nodemailer')
const { Business } = require("../db")
const CryptoJS = require("crypto-js")

router.post("/", async(req, res) => {

	const { email } = req.body
	console.log("1", email)
	try {
			// nodemailer
			let transporter = nodemailer.createTransport({
        	host: 'smtp.gmail.com',
        	port: 465,
        	secure: true,
        	auth: {
          	user: "bringitservices2022@gmail.com",
          	pass: "rgmizokemaustfnd"
       		}
      	});

      	await transporter.sendMail({
        	from: "Bring It App <bringitservices2022@gmail.com>",
        	to: email,
        	subject: "Cambio de contraseña",
        	html: `<h3>Solicitaste un cambio de contraseña, podrás hacerlo haciendo click en este <p><a href="http://localhost:3000/recuperarContrasenia">enlace</a></p></h3>`
      	})
      	console.log("2", email)


      res.status(200).send(email)
	} catch(error) {
		res.status(404).json(error);
	}
})



router.put('/recover/password/olv', async (req,res )=>{
    const passN= Math.floor(Math.random(10000000 - 9000000) * 100000000);
    console.log(req.body.email);
    const userEmail = await Business.findByPk(req.body.email);
    console.log("contraseña nueva: ", passN.toString());
    // if(userEmail){
      const email = userEmail.email;
      console.log("email: ", email)
      console.log('EMAIL: ',email);
      console.log('PASS:',passN); 
      const passHash = CryptoJS.AES.encrypt(passN.toString(), process.env.PASS_SEC).toString();
      console.log('PASS ENCRYPTADA: ', passHash);
      try {
        await Business.update({password: passHash}, {
          where: {
            email: email,
          }
        })
          // nodemailer
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: "bringitservices2022@gmail.com",
            pass: 'rgmizokemaustfnd'
          }
        });
  
        await transporter.sendMail({
          from: "Bring It App <bringitservices2022@gmail.com>",
          to: req.body.email,
          subject: "Cambio de contraseña",
          html: `<h3>Tu contraseña se modifico correctamente!</h3>
          <p>Tienes que iniciar sesón con la siguiente contraseña: ${passN}</p>
          <p>Ya podés iniciar sesión con tu contraseña nueva <a href="http://localhost:3000/">aqui</a></p>
          <p>Recordá que es una contraseña provisoria, vas a tener que ingresar a tu panel de usuario para modificar la contraseña</p>
          `
        })
        
        res.status(200).send('Correo enviado satisfactoriamente!');
      } catch (error) {
        console.log(error);
      }
    // }else{
    //   res.send('email no registrado');
    // }
    
    
  
  })


module.exports = router;