const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email().message('Valid email is required'),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
    }),
  }),
});

const validateUserName = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Invalid id');
      }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
    owner: Joi.object(),
    likes: Joi.array(),
    createdAt: Joi.date(),
  }),
});

module.exports = {
  validateUser,
  validateUserName,
  validateAvatar,
  validateCard,
  validateId,
};
