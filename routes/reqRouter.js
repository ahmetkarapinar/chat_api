const express = require('express');
const reqController = require('./../controllers/reqController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  //   .get(reqController.getAllReqs)
  .get(
    authController.protect,
    authController.restrictTo('owner'),
    reqController.getReqs
  )
  .post(authController.protect, reqController.sendReq);

router
  .route('/respond/:id')
  .post(
    authController.protect,
    authController.restrictTo('owner'),
    reqController.resToReqs
  );
module.exports = router;
