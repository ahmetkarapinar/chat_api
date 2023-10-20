const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');
const router = express.Router();
//authController.protect,
router.use(authController.protect);
router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router.route('/myposts').get(postController.getMyPosts);
router.route('/gym').get(postController.getGymPosts);
router.route('/:id').get(postController.getPost);
module.exports = router;
