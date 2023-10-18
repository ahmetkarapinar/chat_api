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
exports.getMyPosts = async (req, res) => {
  const posts = await Post.find({ owner: req.user.id });
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
};
exports.getPost = async (req, res) => {
  if (!req.user.follows.includes(req.params.id)) {
    return res.status(400).json({
      status: 'fail',
      results: 'You are not following that user...',
    });
  }
  const posts = await Post.find({ owner: req.params.id });
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
  const userId = req.user.id;
  req.body.owner = userId;
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
};
