const mongoose = require('mongoose');
const User = require('./../models/userModel');
const Post = require('./../models/postModel');
// const validator = require('validator');
const gymSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A gym must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A gym name must have less or equal then 40 characters'],
      minlength: [10, 'A gym name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha,  gym name must only contain characters']
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A gym must have a owner'],
    },
    slug: String,
    members: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
    },
    establishment: { type: Date },
    capacity: {
      type: Number,
      required: [true, 'A gym must have a capacity'],
      //   validate: {
      //     // This only works on CREATE and SAVE!!!
      //     validator: function (cap) {
      //       return this.members.length < cap;
      //     },
      //     message: 'Gym capacity is full!',
      //   },
    },
    description: {
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
gymSchema.pre('save', function (next) {
  this.establishment = Date.now();
  next();
});
const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
