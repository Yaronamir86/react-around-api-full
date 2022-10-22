const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const {
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
  VALID_EMAIL_MESSAGE,
  VALID_URL_MESSAGE
} = require('../utils/constants');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': (MIN_STR_MESSAGE),
      'string.max': (MAX_STR_MESSAGE),
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': (MIN_STR_MESSAGE),
      'string.max': (MAX_STR_MESSAGE),
    }),
    avatar: Joi.string().custom(validateURL).message(VALID_URL_MESSAGE),
    email: Joi.string().required().email().message(VALID_EMAIL_MESSAGE),
    password: Joi.string().required().min(8).messages({
      'string.empty': (EMPTY_STR_MESSAGE),
      'string.min': 'Password must be at least 8 characters long',
    }),
  }),
});

const validateUserName = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': (MIN_STR_MESSAGE),
      'string.max': (MAX_STR_MESSAGE),
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': (MIN_STR_MESSAGE),
      'string.max': (MAX_STR_MESSAGE),
    }),
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
    avatar: Joi.string().required().custom(validateURL).message(VALID_URL_MESSAGE),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': (EMPTY_STR_MESSAGE),
        'string.min': (MIN_STR_MESSAGE),
        'string.max': (MAX_STR_MESSAGE),
      }),
    link: Joi.string().required().custom(validateURL).messages({
      'string.empty': (EMPTY_STR_MESSAGE),
      'string.uri': (VALID_URL_MESSAGE),
    }),
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
