const express = require('express');
const gymController = require('./../controllers/gymController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(gymController.getAllGyms)
  .post(
    authController.protect,
    authController.restrictTo('owner'),
    gymController.createGym
  );
module.exports = router;
