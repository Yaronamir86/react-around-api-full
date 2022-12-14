const Card = require('../models/card');
const {
  CREATE,
  INVALID_DATA_MESSAGE,
  FORBIDDEN_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  cardIdValidateProcess,
} = require('../utils/constants');

const NotFound = require('../errors/NotFound-err');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

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
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => res.status(CREATE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
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
        throw new Forbidden(FORBIDDEN_MESSAGE);
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
const likeCard = (req, res, next) => {
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
  ).catch(next);
};

// DELETE REQUEST, ROUTE = ('/cards/:_id/likes')
const disLikeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  cardIdValidateProcess(
    req,
    res,
    Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
  ).catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
};
