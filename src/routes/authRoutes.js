const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const authController = require('../controllers/authController');
const { isLogged } = require('../middleware/login');
const validateInput = require('../middleware/validator');
const { body } = require('express-validator');

const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Ingrese un correo válido'),
    body('password')
        .isLength({min: 6})
        .isAlphanumeric()
        .withMessage('Ingrese una contraseña de al menos 6 caracteres que contenga letras y números.')
];


router.get('/login', authController.login);

router.post('/login', loginValidation, validateInput,authController.loginUser);



router.get('/register', authController.getRegister);

//router.post('/register', mainController.postRegister);

router.get('/logout', authController.logout);

module.exports = router;