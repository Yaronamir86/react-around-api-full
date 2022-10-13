const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { isUrl } = require('../utils/constants');

const userSchema = new mongoose.Schema({
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
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => isUrl.test(v),
      message: 'invalid URL address',
    },
  },
  email: {
    type: String,
    requierd: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'invalid Email address',
    },
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'Password should be at least 8 characters long'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};
// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { password, ...obj } = this.toObject();
  return obj;
};

module.exports = mongoose.model('user', userSchema);
