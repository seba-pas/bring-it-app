const { Router } = require ("express");
const {Travel} = require('./../db')

const router = Router();

//POST / CREATE Travel
// http://localhost:3001/api/travel
router.post('/', async(req,res) => {
    const {UserEmail, TravelProvince, TravelCity, ArrivalProvince, ArrivalCity, startDate, ArrivalDate} = req.body ; 
    if (!UserEmail || !TravelProvince || !TravelCity || !ArrivalProvince || !ArrivalCity || !startDate || !ArrivalDate) {
        res.status(404).send('Faltan datos para crear el viaje')
    } else {
        try{
            const newTravel = await Travel.create({
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
           res.send('error:'+ e.message)
       }
    }
   })

//PUT / UPDATE TRAVEL
// http://localhost:3001/api/travel/:id
router.put('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const modification = req.body; //json con atributos a modificar y nuevos valores
        const q = await Travel.update(modification, {
            where: {id: id}
        });
        res.status(201).send(`${q} Viajes modificados`)
    } catch (e) {
       res.send('error:'+ e.message)
   }
})

//DELETE TRAVEL
// http://localhost:3001/api/travel/:id
router.delete('/:id', async(req,res) => {
        try{
            let {id} = req.params;
            await Travel.destroy({
                where: {id: id}
            });
            res.status(201).send('Viajes eliminados:')
        } catch (e) {
           res.send('error:'+ e.message)
       }
   })


module.exports = router;