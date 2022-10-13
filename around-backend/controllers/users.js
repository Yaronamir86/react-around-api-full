const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATE,
  INVALID_DATA_MESSAGE,
  userIdValidateProcess,
} = require('../utils/constants');

const { JWT_SECRET } = process.env;
const Unauthoraized = require('../errors/Unauthorized');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

// POST REQUEST
// ROUTE = ('/signin')
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      throw new Unauthoraized('Incorrect email or password');
    })
    .catch(next);
};

// POST REQUEST
// ROUTE = ('/signup')
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('The user with the provided email already exists');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((data) => res.status(CREATE).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest({ INVALID_DATA_MESSAGE });
      } else {
        next(err);
      }
    });
};

// GET REQUEST
// ROUTE = ('/users')
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// GET REQUEST
// ROUTE = ('/users/me')
const getCurrentUser = (req, res, next) => {
  const { _id } = req.params;
  userIdValidateProcess(req, res, User.findById(_id), next);
};

// GET REQUEST
// ROUTE = ('/users/:_id')
const getUserById = (req, res, next) => {
  const { _id } = req.params;
  userIdValidateProcess(req, res, User.findById(_id), next);
};

// PATCH REQUEST
// ROUTE = ('/users/me')
const updateUser = (req, res, next) => {
  const { _id } = req.user;
  userIdValidateProcess(
    req,
    res,
    User.findByIdAndUpdate(
      _id,
      { name: req.body.name, about: req.body.about },
      { runValidators: true, new: true }
    ),
    next
  );
};

// PATCH REQUEST
// ROUTE = ('/users/me/avatar')
const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  userIdValidateProcess(
    req,
    res,
    User.findByIdAndUpdate(
      _id,
      { avatar: req.body.avatar },
      { runValidators: true, new: true }
    ),
    next
  );
};

module.exports = {
  login,
  getCurrentUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
