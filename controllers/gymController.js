const Gym = require('./../models/gymModel');

exports.getAllGyms = async function (req, res) {
  const gyms = await Gym.findOneind();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: gyms.length,
    data: {
      gyms,
    },
  });
};

exports.createGym = async function (req, res) {
  req.body.owner = req.user.id;
  console.log('Gym is creating...');
  const gyms = await Gym.create(req.body);
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: gyms.length,
    data: {
      gyms,
    },
  });
};
