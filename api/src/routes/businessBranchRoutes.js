const { Router } = require ("express");
const {Business, Businessbranch, City, Product} = require('../db');
const { Op } = require('sequelize');
const router = Router();

//Este archivo no tiene su Controllers, toda la logica esta aca

//POST new BusinessBranch
// http://localhost:3001/api/businessbranch
router.post('/', async (req,res) => {
    try {
        const { businessName, businessEmail, cityId, province, address } = req.body;
        const cityName = (await City.findByPk(cityId)).nombre;
        const businessBranchName = `${businessName} - sede ${cityName}`;
        const newBusinessBranch = await Businessbranch.create({businessBranchName, businessEmail, cityId, province, address});               
        res.status(201).send("Sede agregada")
    } catch (error) {
        return res.status(404).send(`error: ` + error);
    }
})

//UPDATE BusinessBranch
// http://localhost:3001/api/businessbranch/:id
router.put('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const modification = req.body; //json con atributos a modificar y nuevos valores
        const q = await Businessbranch.update(modification, {
            where: {id: id}
        });
        if (modification.active==false) { //ver si llega como string o no
            await Product.update({
                active: false
            },{where:{
                businessbranchId: id
            }})
        }
        if (modification.active==true) { //ver si llega como string o no
            await Product.update({
                active: true
            },{where:{
                businessbranchId: id
            }})
        }
        res.status(201).send(`${q} Sede modificada`)
    } catch (e) {
       res.send('error:'+ e.message)
   }
})

//GET BusinessBranch con opcion query name
// http://localhost:3001/api/businessbranch
router.get('/', async (req,res) => {
    const {name} = req.query;
    console.log(`search: ${name}`);

    try{
        if (name){
            const foundBusinessBranchesName = await Businessbranch.findAll({
                where: {
                    branchName: {                    
                        [Op.iLike]: `%${name}%`,
                    }
                },            
                include: [{model: Product}, {model: City}, {model: Business}]
            },     
            );
            if (foundBusinessBranchesName.length) {
                return res.json(foundBusinessBranchesName)
            } else {
                return res.send(`No se encontraron sedes con el nombre ${name}`);
            }             
        }
        else{
            const foundBusinessBranchesComplete = await Businessbranch.findAll(
                {
                include: [{model: Product}, {model: City}, {model: Business}]
            }
            ); 
            if (foundBusinessBranchesComplete.length) {
                return res.json(foundBusinessBranchesComplete)
            } else {
                return res.send(`No se encontraron sedes en la bd`);
            } 
        }
    }catch (error) {
        return res.send(error);
    }
});

//DELETE Businessbranch
// http://localhost:3001/api/businessbranch/:id
router.delete('/:id', async(req,res) => {
    try{
        let {id} = req.params;
        const deletedProducts = await Product.destroy ({
            where: {businessbranchId:id}
        })
        const deletedBusinessbranch = await Businessbranch.destroy({
            where: {id: id}
        });
        res.status(201).send(`${deletedBusinessbranch} Sede id: ${id} eliminada y sus ${deletedProducts} productos asociados`);
    } catch (e) {
       res.send('error:'+ e.message)
   }
})

module.exports = router;