const { Router } = require("express");
const router = Router();
const nodemailer = require('nodemailer')
const { Business } = require("../db")
const CryptoJS = require("crypto-js")
// const apikey = "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"
const sendgridTransport = require('nodemailer-sendgrid-transport')

router.post("/", async(req, res, next) => {
	console.log("1", req.body.email)
	try {
         // SENDGRID
         const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: process.env.CREDENTIAL,
            },
         }))


         await transporter.sendMail({
            to: req.body.email,
            from: "pruebabringit@gmail.com",
            subject: "Correo recibido satisfactoriamente",
            html: `<p>Este es el cuerpo del email de confirmación</p>
            <p>Podés cambiar tu contraseña haciendo click en este <a href="bring-it-app.vercel.app/recuperarContrasenia">enlace</a></p>`,
         });


      res.status(200).json("email enviado")
	} catch(error) {
		next(error);
	}
})


// correo cambio de contraseña business
router.put('/recover/password/olv', async (req,res )=>{
    const passN= Math.floor(Math.random(10000000 - 9000000) * 100000000);
    console.log(req.body.email);
    const userEmail = await Business.findByPk(req.body.email);
    console.log("contraseña nueva: ", passN.toString());
    if(userEmail){
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
          const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
               api_key: process.env.CREDENTIAL,
            },
         }))


         await transporter.sendMail({
            to: req.body.email,
            from: "pruebabringit@gmail.com",
            subject: "Correo recibido satisfactoriamente",
            html: `<h3>Tu contraseña se modifico correctamente!</h3>
          <p>Tienes que iniciar sesón con la siguiente contraseña: ${passN}</p>
          <p>Ya podés iniciar sesión con tu contraseña nueva <a href="http://localhost:3000/">aqui</a></p>
          <p>Recordá que es una contraseña provisoria, vas a tener que ingresar a tu panel de usuario para modificar la contraseña</p>
          `,
         });
        
        res.status(200).send('Correo enviado satisfactoriamente!');
      } catch (error) {
        console.log(error);
      }
    } else{
      res.send('email no registrado');
    }
    
  })


module.exports = router;