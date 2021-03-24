//import module express beserta method router
const router = require('express').Router()
const{verify} = require('../helpers/jwt')
const { body, validationResult } = require('express-validator')

// validator
const validator = [
    body('username')
        .notEmpty()
        .withMessage('Username can\'t empty')
        .isLength({ min: 5 })
        .withMessage('Username must have 6 character'),
    body('password')
        .notEmpty()
        .withMessage('Password can\'t empty')
        .isLength({ min: 6 })
        .withMessage('Password must have 6 character')
        .matches(/[0-9]/)
        .withMessage('Password must include number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must include symbol'),
    body('email')
        .isEmail()
        .withMessage('Invalid email')
]

const validatePassword = [
    body('oldpass')
    .notEmpty()
    .withMessage('old password is required.'),

    body('newpass')
    .notEmpty()
    .withMessage('new password is required.')
    .matches(/[!@#$%^&*;]/)
    .withMessage('new password must include special characters.')
    .matches(/[0-9]/)
    .withMessage('new password must include number.')
    .isLength({ min : 6 })
    .withMessage('new password must have min 6 characters.'),
    
    body('confpass')
    .notEmpty()
    .withMessage('new confirm password is required.')
]

//import controller
const {userController} = require ('../controllers')



//create router
router.get ('/getUser', userController.getAllUser);
router.post ('/login', userController.login);
router.post('/keepLogin', verify, userController.keepLogin);
router.get('/verification', verify, userController.emailVerification);
router.post('/register', validator , userController.register)


//import router module
module.exports = router
