const { Router } = require("express");
const {Purchase, User, Travel, Product, Business} = require('../db');

const productRoutes = require ("./productRoutes");
const categoryRoutes = require ("./categoryRoutes");
const businessRoutes = require ("./businessRoutes");
const cityRoutes = require ("./cityRoutes");
const provinceRoutes = require ("./provinceRoutes");
const userRoutes = require ("./userRoutes");
const travelRoutes = require ("./travelRoutes");

const router = Router();


//Configuración de routers
router.use ('/product', productRoutes);
router.use ('/category', categoryRoutes);
router.use ('/business', businessRoutes);
router.use ('/city', cityRoutes);
router.use ('/province', provinceRoutes);
router.use ('/user', userRoutes);
router.use ('/travel', travelRoutes);




module.exports = router;