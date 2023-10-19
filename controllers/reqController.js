const Req = require('./../models/reqModel');
const Gym = require('./../models/gymModel');

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
  const reqs = await Req.findOne({ gym: myGym.id });
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      reqs,
    },
  });
};
exports.resToReqs = async function (req, res) {
  const myRespond = req.body.result;
  const myGym = await Gym.findOne({ owner: req.user.id });
  const myGymId = myGym.id;
  console.log('myGymId: ', myGymId);
  console.log('req Id: ', req.params.id);
  const reqs = await Req.findOne({ _id: req.params.id });
  const newMemberId = req.params.id;
  console.log(`These are your gym\'s reqs: ${reqs}`);
  if (myRespond) {
    myGym.members.push(newMemberId);
    await myGym.save();
    await Req.deleteMany({ _id: reqs.id });
    res.status(200).json({
      status: 'success',
      length: myGym.members.length,
      data: {
        members: myGym.members,
      },
    });
  } else {
    await Req.deleteMany({ id: reqs.id });
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
