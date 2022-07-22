const { Router } = require("express");
const { Purchase, User, Travel, Product, Business } = require('../db');


const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const businessRoutes = require("./businessRoutes");
const cityRoutes = require("./cityRoutes");
const provinceRoutes = require("./provinceRoutes");
const purchaseRouters = require('./purchaseRoutes');
const postPurchaseRoutes = require('./postPurchaseRoutes');
const userRoutes = require('./userRoutes');
const travelRoutes = require('./travelRoutes');

const router = Router();

//Configuración de routers
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/business', businessRoutes);
router.use('/city', cityRoutes);
router.use('/province', provinceRoutes);
router.use('/user', userRoutes);
router.use('/travel', travelRoutes);

//Configuracion de rutas Purchase
router.use('/purchase', purchaseRouters);
router.use('/purchase', postPurchaseRoutes);


//CREATE travel
router.post('/api/travel', async (req, res) => {
    const { id, UserEmail, TravelProvince, TravelCity, ArrivalProvince, ArrivalCity, startDate, ArrivalDate } = req.body;
    if (!UserEmail || !TravelProvince || !TravelCity || !ArrivalProvince || !ArrivalCity || !startDate || !ArrivalDate) {
        res.status(404).send('Faltan datos para crear el viaje')
    } else {
        try {
            const newTravel = await Travel.create({
                id,
                UserEmail,
                TravelProvince,
                TravelCity,
                ArrivalProvince,
                ArrivalCity,
                startDate,
                ArrivalDate
            })
            res.status(201).send('Viaje creado')
        } catch (e) {
            res.send('error:' + e.message)
        }
    }
})

//DELETE TRAVEL
router.delete('/api/travel/:id', async (req, res) => {
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

//UPDATE TRAVEL
router.put('/api/travel/:id', async (req, res) => {
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

//CREATE User
router.post('/api/user', async (req, res) => {
    const { email, password, name, lastname, age, nationality } = req.body;
    if (!email || !password || !name || !lastname || !age || !nationality) {
        res.status(404).send('Faltan datos para crear el usuario')
    } else {
        try {
            const newUser = await User.create({
                email, password, name, lastname, age, nationality
            })
            res.status(201).send('Usuario creado')
        } catch (e) {
            res.send('error:' + e.message)
        }
    }
})

// router.use ('/purchase', purchaseRoutes);

module.exports = router;