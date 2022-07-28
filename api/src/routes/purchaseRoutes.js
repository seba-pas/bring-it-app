const { Router } = require("express");
const {Purchase, User, Product, Purchaseitem} = require('../db');
const {getPurchase} = require( '../controllers/purchaseControllers');

const router = Router();

//ruta de actualizacion purchase

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { totalPrice, waitingTime, arrivalCity } = req.body;
    try {
        await Purchase.update({
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


//ruta Delete borra purchase por Id

router.delete('/delete/:id', function(req, res) {
    Purchase.findByPk(req.params.id).then(function(purchase) {
      purchase.destroy();

      res.status(200).send('se elimino correctamente')
      .catch(err => console.log(err))
      
})});

//ruta get para purchase por id
router.get('/:id', async (req, res)=>{
    const {id}= req.params;
    let purchase= await getPurchase();
    if (id){
        let idPurchase= await purchase.filter(e=>e.id==id);
        if (idPurchase.length!==0) {
            res.status(200).send(idPurchase)
            
        } else {
            res.status(200).send('no se ecnontro Purchese');
        };
    }else{
        res.status(200).send('ingrese ID')
    };
});


//ruta get para purchase por id
router.get('/:id', async (req, res)=>{
    const {id}= req.params;
    let purchase= await getPurchase();
    if (id){
        let idPurchase= await purchase.filter(e=>e.id==id);
        if (idPurchase.length!==0) {
            res.status(200).send(idPurchase)
            
        } else {
            res.status(200).send('no se ecnontro Purchese');
        };
    }else{
        res.status(200).send('ingrese ID')
    };
});

// ruta funcionando todos los purchase
router.get ('/', async (req, res)=>{
    const  allPurchase= await getPurchase();
    try {
        res.status(200).send(allPurchase);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// ruta funcionando sin email y producto //ACTUALIZADA
router.post('/', async (req, res)=>{
    try {
        let {
            totalPrice,
            waitingTime,
            arrivalCity,
            userEmail,
            items
        }= req.body;

        const createdPurchase = await Purchase.create({
            totalPrice,
            waitingTime,
            arrivalCity,
            userEmail,
        });

        //AGREGADO DE ITEMS A PURCHASEITEMS
        const addItems = items.forEach( async (i) => {
            await Purchaseitem.create({
                purchaseId: createdPurchase.id,
                productId: i.id,
                quantity: i.quantity
            })
        })

        res.status(200).send("Compra creada");
    } catch (error) {
        res.status(400).send(error.message)
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