const Post = require('./../models/postModel');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
};
exports.createPost = async (req, res) => {
  const newPost = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newPost,
    },
  });
};
