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
  // Check followId is valid
  const follow = await User.findById(followId);
  if (!follow) {
    return res.status(404).json({
      status: 'fail',
      results: 'user not found',
    });
  }
  if (me.follows) {
    if (me.follows.includes(followId)) {
      return res.status(400).json({
        status: 'fail',
        results: 'You are already following that user',
      });
    }
    me.follows.push(followId);
  } else {
    me.follows = { followId };
  }

  await User.findByIdAndUpdate(me.id, { follows: me.follows });
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
