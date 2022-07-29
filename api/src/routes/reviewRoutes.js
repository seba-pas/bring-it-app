const { Router } = require ("express");
const {Review} = require('./../db')

const router = Router();

//POST new Review
// http://localhost:3001/api/review
router.post('/', async (req, res) => {
    try {
        const newReview = Review.create({...req.body})
        res.status(201).send('Review agregada')
    } catch (error) {
        res.status(404).send('error:'+e.message)
    }
})

//GET Review by id de producto(por params)
// http://localhost:3001/api/review/:idProduct
router.get('/:idProduct', async (req, res) => {
    try {
        const {idProduct} = req.params;
        const foundReview = await Review.findAll({
            where: {
                productId: idProduct
            }
        })
        res.status(201).send(foundReview.length ? foundReview : 'El producto no tiene reviews')
    } catch (error) {
        res.status(404).send('error:'+e.message)
    }
})

//GET Review todos
// http://localhost:3001/api/review
router.get('/', async (req, res) => {
    try {
        const foundReviews = await Review.findAll();
        res.status(201).send(foundReviews.length ? foundReviews : 'No existen reviews')
    } catch (error) {
        res.status(404).send('error:'+e.message)
    }
})

//DELETE Review
// http://localhost:3001/api/review/:id
router.delete('/:id', async(req,res) => {
    try{
        let {id} = req.params;
        const deleted = await Review.destroy({
            where: {id: id}
        });
        res.status(201).send(`${deleted} review deleted`)
    } catch (e) {
       res.send('error:'+ e.message)
   }
})
module.exports = router ;