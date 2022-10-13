const mongoose = require('mongoose');

const { isUrl } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the "name" field must be filled in'],
    minlength: [2, 'the minimum length of the "name" field is 2'],
    maxlength: [30, 'the maximum length of the "name" field is 30'],
  },
  link: {
    type: String,
    required: [true, 'the "link" field must be filled in'],
    validate: {
      validator: (v) => isUrl.test(v),
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
