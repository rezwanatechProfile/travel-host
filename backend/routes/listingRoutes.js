const router = require('express').Router()
const listingController = require('../controllers/listingController')




// ROUTES - METHODS //

router.get('/seed', listingController.getSeed)
router.get('/', listingController.getHomes)
router.post('/create', listingController.createHomes)
router.put('/:id', listingController.updateHome)
router.delete('/:id', listingController.deleteHome)


module.exports = router