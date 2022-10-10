const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controlers/cards');

const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
} = require('../controlers/users');

const {
  validateUser,
  validateUserName,
  validateAvatar,
  validateCard,
  validateId,
} = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:_id', validateId, deleteCardById);
router.put('/cards/:_id/likes', validateId, likeCard);
router.delete('/cards/:_id/likes', validateId, disLikeCard);

router.post('/signin', login);
router.post('/signup', validateUser, createUser);

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', validateId, getUserById);
router.patch('/users/me', validateUserName, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
