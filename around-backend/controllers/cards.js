const Card = require('../models/card');
const {
  CREATE,
  INVALID_DATA,
  UNAUTHORIZED,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  cardIdValidateProcess,
} = require('../utils/constants');

const NotFound = require('../errors/NotFound-err');

// GET REQUEST
// ROUTE = ('/cards')
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

// POST REQUEST
// ROUTE = ('/cards')
const createCard = (req, res, next) => {
  const {
    name, link
  } = req.body;
  const { _id } = req.user;
  Card.create({
    name, link, owner: _id
  })
    .then((card) => res.status(CREATE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA).send({ error: err.message });
      } else {
        res.status(SERVER_ERROR).send({ error: SERVER_ERROR_MESSAGE });
      }
    });
};

// DELETE REQUEST
// ROUTE = ('/cards/:_id')
const deleteCardById = (req, res, next) => {
  const cardId = req.params._id;
  const user = req.user._id;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      const { owner } = card;
      // eslint-disable-next-line eqeqeq
      if (owner != user) {
        return res
          .status(UNAUTHORIZED)
          .send(UNAUTHORIZED_MESSAGE);
      }
      return Card.findByIdAndRemove(cardId).then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(CARD_NOT_FOUND_MESSAGE);
      }
    })
    .catch(next);
};

// PUT REQUEST
// ROUTE = ('/cards/:_id/likes')
const likeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  cardIdValidateProcess(
    req,
    res,
    Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    )
  );
};

// DELETE REQUEST, ROUTE = ('/cards/:_id/likes')
const disLikeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  cardIdValidateProcess(
    req,
    res,
    Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true })
  );
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, disLikeCard
};
