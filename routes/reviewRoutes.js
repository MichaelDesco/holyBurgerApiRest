const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController') 

router
    .route('/')
    .get(reviewController.findAllReviews)
    .post(authController.protect, authController.restrictTo('goûteur'), reviewController.createReview)
    // .post(authController.protect, reviewController.createReview)

router
    .route('/:id')
        .get(reviewController.findReviewByPk)
//     .put(authController.protect, authController.restrictToOwnUser, reviewController.updateReview)
//     .delete(authController.protect, authController.restrictTo('superadmin'), reviewController.deleteReview)

module.exports = router;