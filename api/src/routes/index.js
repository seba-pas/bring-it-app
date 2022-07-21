const { Router } = require("express");
const {Purchase, User} = require('../db');

const productRoutes = require ("./productRoutes");
const categoryRoutes = require ("./categoryRoutes");
const businessRoutes = require ("./businessRoutes");
const cityRoutes = require ("./cityRoutes");
const provinceRoutes = require ("./provinceRoutes");

const router = Router();

// const getDbPedidos = async ()=>{
//     return Purchase.findAll({
//         include:{
//             model: User,
//             attributes: ['Email'],
//             through:{
//                 atributes: [],
//             },
//         },
//     });
// };

// //El api aca no iria, xq ya esta en el archivo app.js
// router.get ('/api/pedidos', async (req, res)=>{
//     try {
//         return res.status(200).send(getDbPedidos);
//     } catch (error) {
//         return res.status(404).send(message.error);
//     }
// })

//Configuración de routers
router.use ('/product', productRoutes);
router.use ('/category', categoryRoutes);
router.use ('/business', businessRoutes);
router.use ('/city', cityRoutes);
router.use ('/province', provinceRoutes);

module.exports = router;