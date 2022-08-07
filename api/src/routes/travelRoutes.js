
const { Router } = require("express");
const { Travel , Purchase , Purchaseitem, Product , Businessbranch, User } = require('./../db')
const { getTravel } = require('../controllers/travelControllers')
const router = Router();
const {Op} = require('sequelize');
const { verifyToken } = require ("../middlewares/verifyToken");
const nodemailer = require('nodemailer');

//GET trae todos los travel
router.get('/', async (req, res) => {
    const allTravel = await getTravel();
    try {
        res.status(200).send(allTravel);
    } catch (error) {
        res.status(404).send(error.message);
    }

})

//POST / CREATE Travel
// http://localhost:3001/travel
router.post('/', verifyToken, async (req, res) => {
    const { userEmail, travelProvince, travelCityId, arrivalProvince, arrivalCityId, startDate, arrivalDate } = req.body;
    if(req.userLogin.email === userEmail || req.userLogin.isAdmin){  
        if (!userEmail || !travelProvince || !travelCityId || !arrivalProvince || !arrivalCityId || !startDate || !arrivalDate) {
            res.status(404).send('Faltan datos para crear el viaje')
        } else {
            try {
                const newTravel = await Travel.create({
                    userEmail,
                    travelProvince,
                    travelCityId,
                    arrivalProvince,
                    arrivalCityId,
                    startDate,
                    arrivalDate
                })
                res.status(201).send('Viaje creado')
            } catch (e) {
                res.send('error:' + e.message)
            }
        }
    } else{
        res.status(403).json(`No tiene permiso para agregarle un viaje al usuario ${userEmail}`);
      } 
})

//PUT / UPDATE TRAVEL
// http://localhost:3001/travel/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const modification = req.body; //json con atributos a modificar y nuevos valores
        const q = await Travel.update(modification, {
            where: { id: id }
        });
        res.status(201).send(`${q} Viajes modificados`)
    } catch (e) {
        res.send('error:' + e.message)
    }
})

//DELETE TRAVEL
// http://localhost:3001/api/travel/:id
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        await Travel.destroy({
            where: { id: id }
        });
        res.status(201).send('Viajes eliminados:')
    } catch (e) {
        res.send('error:' + e.message)
    }
})

//GET BY PURCHASE // trae todos los travels que coinciden con una purchase
// http://localhost:3001/api/travel/:idPurchase
router.get('/purchase/:idPurchase', async (req, res) => {
    try {
        const {idPurchase} = req.params;
        let purchase = await Purchase.findByPk(idPurchase, {
            include: [{model: Purchaseitem}]
        });
        
        let purchaseTravelCity = ( await Product.findByPk(purchase.purchaseitems[0].productId, {
            include: [{model: Businessbranch}]
        })).businessbranch.cityId;

        let matchTravels = await Travel.findAll({
            where: {
                travelCityId : {
                    [Op.eq]: purchaseTravelCity
                },
                arrivalCityId:{
                    [Op.eq]: purchase.arrivalCityId
                },
                arrivalDate: {
                    [Op.lt]: purchase.maxDeliveryDate
                }
            }
        })
        res.status(200).send(matchTravels.length ? matchTravels : "No existen coincidencias");
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.put('/purchase/:idPurchase/:travelId', async (req,res) => {
    try {
        const {idPurchase, travelId} = req.params;
        const purchase = await Purchase.findByPk(idPurchase);
        if (!purchase.travelId) {
                    const updated = await Purchase.update({travelId}, {
            where: {id: idPurchase}
        });
    // nodemailer
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'bringit662@gmail.com',
          pass: 'owtgyxnzmbchbhjj'
        }
      });
      // mail a viajero
      const purchaser = await User.findByPk(purchase.userEmail);
      const traveler = await User.findByPk((await Travel.findByPk(travelId)).userEmail);
      const emailTraveler = await transporter.sendMail({
        from: "Bring It App <bringit662@gmail.com>",
        to: traveler.email,
        subject: "¡Nuevo paquete para transportar!",
        html: `<h3>¡Felicitaciones, vas a transportar la compra de ${purchaser.name}!</h3>
        <p>Estamos muy contentos de que puedas aprovechar tu viaje para 
        transportar una compra más de la comunidad.
        <br>
        Por favor ingresa al siguiente Link para poder coordinar la entrega con ${purchaser.name}:
        <br>
        <a href="https://bring-it-app.vercel.app/join">https://bring-it-app.vercel.app/join</a>
        <br />
        ¡Muchas gracias!
        </p>`
      })
      const emailPurchaser = await transporter.sendMail({
        from: "Bring It App <bringit662@gmail.com>",
        to: purchaser.email,
        subject: `¡Tu compra Nº${idPurchase} ya tiene transporte!`,
        html: `<h3>¡Felicitaciones, tu compra Nº${idPurchase} ya tiene transporte!!</h3>
        <p>Estamos muy contentos de que puedas comprar a través de Bring it.
        <br />
        ${traveler.name} llevará tu paquete a destino. Por favor comunicate con el/la a través del chat de la página.
        <br />
        <a href="https://bring-it-app.vercel.app/join">https://bring-it-app.vercel.app/join</a>
        <br />
        ¡Muchas gracias!
        </p>`
      })
        res.status(201).send("Matcheado con éxito")
        } else {
            res.status(200).send("La compra ya cuenta con viajero")
        }

        
    } catch (error) {
        res.status(404).send(error.message);
    }
})


module.exports = router;