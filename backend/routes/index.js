const router = require('express').Router()
const listingsRoute = require('./listingRoutes')



// URL DIRECTORY

router.use('/homes', listingsRoute)



module.exports = router