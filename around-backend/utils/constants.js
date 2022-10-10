// VALIDATION REGEX
const isUrl = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;

// STATUS CODE
const CREATE = 201;
const INVALID_DATA = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

// STATUS MESSAGES
const INVALID_DATA_MESSAGE = 'this input is invalid data';
const USER_NOT_FOUND_MESSAGE = 'this user id is not exist';
const CARD_NOT_FOUND_MESSAGE = 'thiS card id is not exist';
const SERVER_ERROR_MESSAGE = 'an error acured with the server';
const DATA_EXIST_MESSAGE = 'this user already exist';

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
  SERVER_ERROR,
  isUrl,
  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
  DATA_EXIST_MESSAGE,
  cardIdValidateProcess,
  userIdValidateProcess
};
