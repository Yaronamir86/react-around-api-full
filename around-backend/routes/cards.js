const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:_id', validateId, deleteCardById);
router.put('/:_id/likes', validateId, likeCard);
router.delete('/:_id/likes', validateId, disLikeCard);
