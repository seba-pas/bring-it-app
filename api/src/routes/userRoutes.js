const { Router } = require ("express");
const {User} = require('./../db')

const router = Router();

//POST / CREATE User
// http://localhost:3001/api/user
router.post('/', async(req,res) => {
    const {email, password, name, lastname, age, nationality} = req.body ; 
    if (!email || !password || !name || !lastname || !age|| !nationality) {
        res.status(404).send('Faltan datos para crear el usuario')
    } else {
        try{
            const newUser = await User.create({
                email, password, name, lastname, age, nationality
            })
            console.log(newUser);
            res.status(201).send('Usuario creado')
        } catch (e) {
           res.send('error:'+ e.message)
       }
    }
   })

// PUT / UPDATE USER
// http://localhost:3001/api/user/:email
router.put('/:email', async(req,res) => {
    try{
        const {email} = req.params;
        const modification = req.body; //json con atributos a modificar y nuevos valores
        const q = await User.update(modification, {
            where: {email: email}
        });
        res.status(201).send(`${q} Usuarios modificadas`)
    } catch (e) {
       res.send('error:'+ e.message)
   }
})


module.exports = router;