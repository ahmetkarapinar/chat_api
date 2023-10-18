const mongoose = require('mongoose');
const User = require('./../models/userModel');
const slugify = require('slugify');
// const validator = require('validator');
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A post must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A post name must have less or equal then 40 characters'],
      minlength: [10, 'A post name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha,  post name must only contain characters']
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A post must have a owner'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A post must have a duration'],
    },

    difficulty: {
      type: String,
      required: [true, 'A post must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    description: {
      type: String,
      trim: true,
    },
    calories: {
      required: [true, 'A post must have a calorie'],
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
postSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
