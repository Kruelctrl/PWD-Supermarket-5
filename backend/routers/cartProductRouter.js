// import express router
const router = require ('express').Router()

// import controllers
const { cartProductController } = require('../controllers')

// create router
router.get('/cartProduct', cartProductController.getCartProduct)
router.post('/deleteCartProduct', cartProductController.deleteCartProduct)
router.post('/editCart', cartProductController.editCart)

// export router
module.exports = router