const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');


router
    .route('/')
    .get(userController.findAllUsers)

    router
    .route('/:id')
    .get(authController.protect,userController.findOneUser)
    .put(userController.updateUser)
    .delete(authController.protect, authController.restrictTo("admin"),userController.deleteUser)

    router
    .route('/:id/:roles')
    .get(authController.protect, userController.findRoles)

    // router
    // .route('/:id/restaurants')
    // .get(userController.findRestaurantsByUserId)

router
    .route('/login')
    .post(authController.login)

router
    .route('/signup')
    .post(authController.signup)

module.exports = router;

