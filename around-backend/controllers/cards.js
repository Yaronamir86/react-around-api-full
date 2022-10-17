const Card = require('../models/card');
const {
  CREATE,
  INVALID_DATA,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  cardIdValidateProcess,
} = require('../utils/constants');

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
const deleteCardById = (req, res) => {
  const { _id } = req.user;
  cardIdValidateProcess(
    req,
    res,
    Card.findByIdAndRemove(
      _id,
    )
  );
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
