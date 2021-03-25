const router = require('express').Router()

const{productController} = require('../controller')

router.get('/getAllProduct', productController.getAllproducts )
router.get('/candyProduct', productController.getProductByCateCandy)
router.get('/chipsProduct', productController.getProductByCateChips)
router.get('/softDrinkProduct', productController.getProductByCateDrink)
router.get('/chocoProduct', productController.getProductByCateChoco)
router.get('/productAscending', productController.getProductPriceUp)
router.get('/productDescending', productController.getProductPriceDown)

//export router
module.exports = router