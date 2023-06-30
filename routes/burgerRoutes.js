const express = require('express');
const router = express.Router();
const burgersController = require('../controllers/burgersController')
const authController = require('../controllers/authController')

router
.route('/')
.get(burgersController.findAllBurgers)
.post(authController.protect,authController.restrictTo("restaurateur"), burgersController.createBurger);

    router
        .route('/random')
        .get(burgersController.findRandomBurger)

    // router
    // .route('/Review')
    // .get(burgersController.findAllBurgersByReview)

    router
        .route('/:id')
        .get(burgersController.findBurgerByPk)
        .put(authController.protect, authController.restrictTo('restaurateur'), burgersController.updateBurger)
        .delete(authController.protect, authController.restrictTo('admin'), burgersController.deleteBurger)


module.exports = router;