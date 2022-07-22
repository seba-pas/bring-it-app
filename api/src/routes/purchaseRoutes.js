const { Router } = require("express");
const {Purchase, User} = require('../db');
const {getPurchase} = require( '../controllers/purchaseControllers');

const router = Router();

//ruta de actualizacion purchase
router.put("/:id", async (req,res) => {
	const {id} = req.params;
	const {
        totalPrice,
        waitingTime,
        arrivalCity
        } = req.body;

const editDog = await Purchase.update({totalPrice, waitingTime, arrivalCity}, 
{where:{id}}
)
})

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

// ruta funcionando
router.get ('/', async (req, res)=>{
    const  allPurchase= await getPurchase();
    try {
        res.status(200).send(allPurchase);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
// ruta funcionando sin email y producto
router.post('/', async (req, res)=>{
    try {
        let {
            // id,
            // idProduct,
            // email,
            totalPrice,
            waitingTime,
            arrivalCity
        }= req.body;

        const createdPurchase = await Purchase.create({
            // id,
            totalPrice,
            waitingTime,
            arrivalCity
        });
        // await createdPurchase.addUser(email);
        // await createdPurchase.addProduct(id=idProduct);

        res.status(200).send('Purchase completed');
        
    } catch (error) {
        res.status(404).send(error.message)
    }

});



// POST PURCHASES
router.post('/', async (req, res)=>{
    const { totalPrice, waitingTime, arrivalCity } = req.body;

    try {
        const createdPurchase = await Purchase.create({
            // id,
            totalPrice,
            waitingTime,
            arrivalCity
        });
        // await createdPurchase.addUser(email);
        // await createdPurchase.addProduct(id=idProduct);

        res.status(200).send('Purchase completed');
        
    } catch (error) {
        res.status(404).send(`Error at postPurchase route: ${error}`);
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