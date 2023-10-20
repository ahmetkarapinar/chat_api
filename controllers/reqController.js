const Req = require('./../models/reqModel');
const Gym = require('./../models/gymModel');
const User = require('./../models/userModel');

exports.getAllReqs = async function (req, res) {
  const reqs = await Req.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reqs.length,
    data: {
      reqs,
    },
  });
};
exports.getReqs = async function (req, res) {
  const myGym = await Gym.findOne({ owner: req.user.id });
  const reqs = await Req.find({ gym: myGym.id });
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    length: reqs.length,
    data: {
      reqs,
    },
  });
};
exports.resToReqs = async function (req, res) {
  const myRespond = req.body.result;
  console.log(myRespond);
  const myGym = await Gym.findOne({ owner: req.user.id });
  const myGymId = myGym.id;

  //Find the corresponding request first
  const reqs = await Req.findOne({ _id: req.params.id });
  const newMember = await User.findOne({ _id: reqs.sender });
  const newMemberId = newMember.id;
  //If the response is positive, add that member to members. Delete all relating requests
  if (myRespond) {
    await User.findByIdAndUpdate(newMemberId, { membership: myGymId });
    myGym.members.push(newMemberId);
    console.log(myGym.capacity);
    myGym.capacity = myGym.capacity - 1;
    await myGym.save();
    await Req.deleteMany({ sender: newMemberId, gym: myGymId });
    res.status(200).json({
      status: 'success',
      length: myGym.members.length,
      data: {
        members: myGym.members,
      },
    });
  } else {
    await Req.deleteMany({ sender: newMemberId, gym: myGymId });
    res.status(400).json({
      status: 'fail',
      message: 'Your request is rejected by the gym owner!',
    });
  }
};

exports.sendReq = async function (req, res) {
  const newObject = {
    sender: req.user.id,
    message: req.body.message,
    gym: req.body.gym,
  };

  console.log('Req is sending...');
  const reqs = await Req.create(newObject);
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reqs.length,
    data: {
      reqs,
    },
  });
};
