const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { isUrl } = require('../utils/constants');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'the minimum length of the "name" field is 2'],
    maxlength: [30, 'the maximum length of the "name" field is 30'],
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: [2, 'the minimum length of the "about" field is 2'],
    maxlength: [30, 'the maximum length of the "about" field is 30'],
    required: true,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl.test(v),
      message: 'invalid URL address',
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    },
  },
  email: {
    type: String,
    requierd: [true, '"email" is required'],
    unique: true,
    validate: {
      validaor: (v) => validator.isEmail(v),
      message: 'invalid Email address',
    }
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'Password should be at least 8 characters long'],
    select: false,
  }
},
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user; // user is available!
        });
    });
};

module.exports = mongoose.model('user', userSchema);
