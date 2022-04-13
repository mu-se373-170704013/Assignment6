const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'MissingEmail'],
        unique: [true, 'TakenEmail'],
        lowercase: true,
        validate: [validator.isEmail, 'UnvalidEmail']
      },
    password: {
        type: String,
        minlength: [8, 'ShortPassword'],
        required: [true, 'MissingPassword'],
    },
    username: {
        type: String,
        required: [true, 'MissingUsername'],
        unique: [true, 'TakenUsername'],
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
  })

const User = mongoose.model('user', userSchema);
module.exports = User;