const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, validateCard, createCard);
router.delete('/:_id', auth, validateId, deleteCardById);
router.put('/:_id/likes', auth, validateId, likeCard);
router.delete('/:_id/likes', auth, validateId, disLikeCard);

module.exports = router;
