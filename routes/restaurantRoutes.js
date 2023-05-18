const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const restaurantsController = require('../controllers/restaurantsController')
// const { upload } = require('../middleware/multer-config');

router
  .route('/')
  .get(restaurantsController.findAllRestaurants)
  // .post(authController.protect, upload.single('picture'), restaurantsController.createRestaurant);
  .post(authController.protect, restaurantsController.createRestaurant);

router
  .route('/:id')
  .get(restaurantsController.findRestaurantByPk)
  .put(authController.protect, authController.restrictTo('restorer','admin', 'superadmin'), restaurantsController.updateRestaurant)
  .delete(authController.protect, authController.restrictTo('superadmin'), restaurantsController.deleteRestaurant);

router
  .route('/:id/burgers')
  .get(restaurantsController.findBurgersByRestaurantId);

module.exports = router;

