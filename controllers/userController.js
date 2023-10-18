const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.follow = async (req, res, next) => {
  const me = req.user;
  const followId = req.body.id;
  // Check if user try to follow himself
  if (me.id === followId) {
    return res.status(400).json({
      status: 'fail',
      results: 'You cannot follow yourself...',
    });
  }
  // Check followId is valid
  const follow = await User.findById(followId);
  if (!follow) {
    return res.status(404).json({
      status: 'fail',
      results: 'user not found',
    });
  }
  // Check if the user is already followed
  if (me.follows.includes(followId)) {
    return res.status(400).json({
      status: 'fail',
      results: 'You are already following that user',
    });
  }
  follow.followers.push(me.id);
  me.follows.push(followId);

  await User.findByIdAndUpdate(me.id, { follows: me.follows });
  await User.findByIdAndUpdate(follow.id, { followers: follow.followers });
  res.status(200).json({
    status: 'success',
    results: me.follows.length,
    data: {
      follows: me.follows,
    },
  });
};
exports.unfollow = async (req, res, next) => {
  const me = req.user;
  const unfollowId = req.body.id;
  // Check if user is in follows array
  if (!me.follows.includes(unfollowId)) {
    return res.status(400).json({
      status: 'fail',
      results: 'You are not following that user',
    });
  }
  const unfollow = await User.findById(unfollowId);
  unfollow.followers.pop(me.id);
  me.follows.pop(unfollowId);
  api;

  await User.findByIdAndUpdate(me.id, { follows: me.follows });
  await User.findByIdAndUpdate(unfollow.id, { followers: unfollow.followers });
  res.status(200).json({
    status: 'success',
    results: me.follows.length,
    data: {
      follows: me.follows,
    },
  });
};

exports.follows = async (req, res) => {
  const user = await User.findById(req.user.id);
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: user.follows.length,
    data: {
      follows: user.follows,
    },
  });
};
exports.followers = async (req, res) => {
  const user = await User.findById(req.user.id);
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: user.followers.length,
    data: {
      follows: user.followers,
    },
  });
};
