const mongoose = require('mongoose');
const User = require('./../models/userModel');
const Post = require('./../models/postModel');
const Gym = require('./../models/gymModel');
// const validator = require('validator');
const reqSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A request must have a owner'],
    },
    slug: String,
    gym: {
      type: mongoose.Schema.ObjectId,
      ref: 'Gym',
    },
    date: { type: Date },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
reqSchema.pre('save', function (next) {
  this.date = Date.now();
  next();
});
const Req = mongoose.model('Req', reqSchema);

module.exports = Req;
