const Post = require('./../models/postModel');
const Gym = require('./../models/gymModel');
const User = require('./../models/userModel');

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
exports.getGymPosts = async (req, res) => {
  //Find my gym
  const gym = await Gym.find({ members: req.user.id });
  //console.log(gym);
  const otherMembers = gym[0].members;
  //console.log(otherMembers);
  const otherMemberIds = otherMembers.map((el) => el.id);
  //console.log('otherMembersids:', otherMemberIds);
  //Find the other gym members which's profile is not private
  const nonPrivateMembers = await User.find({
    _id: { $in: otherMembers },
    isPrivate: false,
  });
  //console.log('non private members', nonPrivateMembers);
  const nonPrivateIds = nonPrivateMembers.map((el) => el.id);
  //console.log(nonPrivateIds);
  const gymPosts = await Post.find({ owner: { $in: nonPrivateIds } });

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: gymPosts.length,
    data: {
      gymPosts,
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
