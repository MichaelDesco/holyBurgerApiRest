const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const restaurantsController = require('../controllers/restaurantsController');

router
  .route('/')
  .get(restaurantsController.findAllRestaurants)
  // .post(authController.protect, restaurantsController.createRestaurant)
  .post(authController.protect, authController.restrictTo("restorer"), restaurantsController.createRestaurant);

  router
  .route('/random')
  .get(restaurantsController.findRandomRestaurant)
  
  router
    .route('/byuser/:id')
    .get(restaurantsController.findRestaurantsByUser)

  router
    .route('/:id')
    .get(restaurantsController.findRestaurantByPk)
    // .put(authController.protect, authController.restrictTo('restorer','admin', 'superadmin'), restaurantsController.updateRestaurant)
    // .delete(authController.protect, authController.restrictTo('superadmin'), restaurantsController.deleteRestaurant);
      router
      .route('/:id/burgers')
      .get(restaurantsController.findBurgersByRestaurantId)

module.exports = router


