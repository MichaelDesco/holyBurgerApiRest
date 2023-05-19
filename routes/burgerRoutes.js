const express = require('express');
const router = express.Router();
const burgersController = require('../controllers/burgersController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(burgersController.findAllBurgers)
    // .post(authController.protect, authController.restrictTo('restorer'), burgersController.createBurger)
    .post(authController.protect, burgersController.createBurger)

    // router
    // .route('/withReview')
    // .get(burgersController.findAllBurgersByReview)

// router
//     .route('/:id')
//     .get(burgersController.findBurgerByPk)
//     .put(authController.protect, authController.restrictTo('restorer','admin', 'superadmin'), burgersController.updateBurger)
//     .delete(authController.protect, authController.restrictTo('superadmin'), burgersController.deleteBurger)

module.exports = router;