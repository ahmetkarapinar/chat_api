const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').get((req, res, next) => {
  res
    .status(200)
    .json({ name: 'Ahmet Karapinar', email: 'ahmetkarapinarr00@gmail.com' });
});

module.exports = router;
