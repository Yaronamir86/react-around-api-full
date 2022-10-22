// VALIDATION REGEX
const isUrl = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;

// STATUS CODE
const CREATE = 201;
const INVALID_DATA = 400;
const UNAUTHORIZED = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

// STATUS MESSAGES
const INVALID_DATA_MESSAGE = 'This input is invalid data';
const USER_NOT_FOUND_MESSAGE = 'This user id is not exist';
const UNAUTHORIZED_MESSAGE = 'Authorization Required';
const CARD_NOT_FOUND_MESSAGE = 'This card id is not exist';
const SERVER_ERROR_MESSAGE = 'An error acured with the server';
const DATA_EXIST_MESSAGE = 'This user already exist';

// VALIDATION MESSAGES
const MIN_STR_MESSAGE = 'Input must be at least 2 characters long!';
const MAX_STR_MESSAGE = 'Input must be less then 30 characters long!';
const EMPTY_STR_MESSAGE = 'Required input!';
const VALID_EMAIL_MESSAGE = 'Valid Email is required!';
const VALID_URL_MESSAGE = 'Valid url link is required!';

const cardIdValidateProcess = (req, res, action) =>
  action
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ error: CARD_NOT_FOUND_MESSAGE });
      } else if (err.name === 'castError') {
        res.status(INVALID_DATA).send({ error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });

const userIdValidateProcess = (req, res, action) =>
  action
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ error: USER_NOT_FOUND_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA).send({ error: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });

module.exports = {
  CREATE,
  INVALID_DATA,
  NOT_FOUND,
  UNAUTHORIZED,
  SERVER_ERROR,
  isUrl,
  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
  DATA_EXIST_MESSAGE,
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
  VALID_EMAIL_MESSAGE,
  VALID_URL_MESSAGE,
  cardIdValidateProcess,
  userIdValidateProcess
};
