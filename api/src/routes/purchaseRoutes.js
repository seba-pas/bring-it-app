const { Router } = require("express");
const { Purchase, User, Product, Purchaseitem } = require("../db");
const { getPurchase } = require("../controllers/purchaseControllers");

const router = Router();

//POST JSON 
// /purchase/json
router.post('/json', async (req,res) => {
  try {
      const jsonPurchase = req.body;
      const purchaseLoad = jsonPurchase.forEach( async (p) => {     
        const createdPurchase = await Purchase.findOrCreate({
          where: {
            totalPrice: p.totalPrice,
            maxDeliveryDate: p.maxDeliveryDate,
            arrivalCityId: p.arrivalCityId,
            province: p.province,
            userEmail: p.userEmail,
          }})
          const addItems = p.items.forEach(async (i) => {
            await Purchaseitem.findOrCreate({
              where: {
              purchaseId: createdPurchase[0].id,
              productId: i.id,
              quantity: i.quantity,
              productName: i.name
              }
            });
      }) 
    }); res.status(201).send('Purchases saved successfully') ;
    }catch(e){
      res.status(404).send(`error en postPurchaseJson: ${e.message}`)
    }
})


// ruta de actualizacion purchase
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { totalPrice, maxDeliveryDate, arrivalCityId } = req.body;
  try {
    await Purchase.update(
      {
        totalPrice,
        maxDeliveryDate,
        arrivalCityId,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send(`Purchase updated successfully`);
  } catch (err) {
    res.status(500).send(`Error at update route: ${err}`);
  }
});

//ruta Delete borra purchase por Id

router.delete("/:id", function (req, res) {
  Purchase.findByPk(req.params.id).then(function (purchase) {
    purchase.destroy();

    res
      .status(200)
      .send("se elimino correctamente")
      .catch((err) => console.log(err));
  });
});

//ruta get para purchase por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let purchase = await getPurchase();
  if (id) {
    let idPurchase = await purchase.filter((e) => e.id == id);
    if (idPurchase.length !== 0) {
      res.status(200).send(idPurchase);
    } else {
      res.status(200).send("no se ecnontro Purchese");
    }
  } else {
    res.status(200).send("ingrese ID");
  }
});

//GET para purchases por email del usuario
router.get("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    let filteredPurchase = await Purchase.findAll({
      where: { userEmail: email },
      include: [
        {
          model: Purchaseitem,
          include: [{ model: Product, attributes: ["name"] }],
        },
      ],
    });
    res
      .status(201)
      .send(filteredPurchase ? filteredPurchase : "No se encontraron compras");
  } catch (error) {
    res.status(404).send(error);
  }
});

// ruta funcionando todos los purchase
router.get("/", async (req, res) => {
  const allPurchase = await getPurchase();
  try {
    res.status(200).send(allPurchase);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// POST //ACTUALIZADA
router.post("/", async (req, res) => {
  try {
    let {
      totalPrice,
      maxDeliveryDate,
      arrivalCityId, //pasar a id
      userEmail,
      province,
      items,
    } = req.body;

    const createdPurchase = await Purchase.create({
      totalPrice,
      maxDeliveryDate,
      arrivalCityId,
      province,
      userEmail,
    });
    //AGREGADO DE ITEMS A PURCHASEITEMS
    const addItems = items.forEach(async (i) => {
      await Purchaseitem.create({
        purchaseId: createdPurchase.id,
        productId: i.id,
        quantity: i.quantity,
        productName: i.name // agregar en el form de purchase (ya viene en el cart)
      });
     const oldStock =  (await Product.findByPk(i.id)).stock;
     await Product.update({
      stock: (oldStock - i.quantity)
     }, {
      where: {
        id: i.id
      }
     })
    });


    res.status(200).send(createdPurchase ? createdPurchase : "No se hizo la compra");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
