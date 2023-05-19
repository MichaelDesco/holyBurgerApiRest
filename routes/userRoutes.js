const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');


router
    .route('/')
    .get(authController.protect, userController.findAllUsers)

    // router
    // .route('/:id')
    // .get(authController.protect, userController.findOneUser)

    // router
    // .route('/:id/:roles')
    // .get(authController.protect,userController.findRoles)

router
    .route('/login')
    .post(authController.login)

router
    .route('/signup')
    .post(authController.signup)

module.exports = router;

