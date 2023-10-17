const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/', userController.getAllUsers);
router.post('/follow', authController.protect, userController.follow);
router.get('/follows', authController.protect, userController.follows);

module.exports = router;
